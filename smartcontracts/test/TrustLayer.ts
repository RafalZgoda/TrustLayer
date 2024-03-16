const { expect } = require("chai");
const { ethers } = require("hardhat");
import hre from "hardhat";

describe("TrustLayer", function () {
  let trustLayer, USDC;
  let owner, alice, bob, charlie: any;
  const MAX_TRUST = "32100000000000000000000000";

  beforeEach(async function () {
    [owner, alice, bob, charlie] = await ethers.getSigners();

    USDC = await hre.ethers.deployContract("USDC", []);
    trustLayer = await hre.ethers.deployContract("TrustLayer", []);

    // Mint USDC tokens for testing
    await USDC.connect(owner).mint(alice.address, ethers.parseEther("1000"));
    await USDC.connect(owner).mint(bob.address, ethers.parseEther("1000"));
    await USDC.connect(owner).mint(charlie.address, ethers.parseEther("1000"));
  });

  it("should allow adding members and setting trust relationships", async function () {
    await trustLayer.connect(owner).addMember(alice.address);
    await trustLayer.connect(owner).addMember(bob.address);
    await trustLayer.connect(owner).addMember(charlie.address);

    await trustLayer.connect(alice).setTrust(bob.address, MAX_TRUST);
    await trustLayer.connect(alice).setTrust(charlie.address, MAX_TRUST);

    // Add more tests here to verify the states and trust relationships
  });
  it("should allow borrowing from trusted members up to allowed limit", async function () {
    // Montant à emprunter
    const borrowAmount = ethers.parseEther("20");

    // Ajout de membres au contrat TrustLayer et configuration de la confiance
    await trustLayer.connect(owner).addMember(alice.address);
    await trustLayer.connect(owner).addMember(bob.address);
    await trustLayer.connect(alice).setTrust(bob.address, MAX_TRUST);

    // Alice approuve TrustLayer pour utiliser ses tokens USDC
    await USDC.connect(alice).approve(trustLayer.target, MAX_TRUST);

    // Vérifier le solde d'Alice et de Bob avant l'emprunt
    const balAliceBefore = await USDC.balanceOf(alice.address);
    const bobBalanceBefore = await USDC.balanceOf(bob.address);

    console.log({ balAliceBefore, bobBalanceBefore });
    // Bob effectue l'emprunt
    await trustLayer.connect(bob).borrow(USDC.target, borrowAmount);

    // Vérifier les soldes d'Alice et de Bob après l'emprunt
    const balAliceAfter = await USDC.balanceOf(alice.address);
    const bobBalanceAfter = await USDC.balanceOf(bob.address);

    console.log({ balAliceAfter, bobBalanceAfter });
    // Vérifications finales
    // Bob a bien reçu le montant emprunté
    expect(BigInt(bobBalanceAfter) - BigInt(bobBalanceBefore)).to.equal(BigInt(borrowAmount));
    expect(BigInt(balAliceBefore) - BigInt(balAliceAfter)).to.equal(BigInt(borrowAmount));
  });

  it("should allow paying back individual loans and all loans at once", async function () {
    // Montant à emprunter
    const borrowAmount = ethers.parseEther("20");

    // Ajout de membres au contrat TrustLayer et configuration de la confiance
    await trustLayer.connect(owner).addMember(alice.address);
    await trustLayer.connect(owner).addMember(bob.address);
    await trustLayer.connect(alice).setTrust(bob.address, MAX_TRUST);

    // Alice approuve TrustLayer pour utiliser ses tokens USDC
    await USDC.connect(alice).approve(trustLayer.target, MAX_TRUST);

    // Bob effectue l'emprunt
    await trustLayer.connect(bob).borrow(USDC.target, borrowAmount);

    // Vérifier le solde d'Alice et de Bob après l'emprunt (avant le remboursement)
    const balAliceAfterBorrow = await USDC.balanceOf(alice.address);
    const bobBalanceAfterBorrow = await USDC.balanceOf(bob.address);

    // Mint new USDC tokens for Bob to enable repayment
    await USDC.connect(owner).mint(bob.address, borrowAmount);

    // Bob approves TrustLayer to use his USDC tokens for repayment with increased allowance
    await USDC.connect(bob).approve(trustLayer.target, MAX_TRUST);

    // Check Bob's balance before repayment
    const bobBalanceBeforeRepayment = await USDC.balanceOf(bob.address);

    // Bob rembourse le prêt individuellement
    await trustLayer.connect(bob).payBackIndividualLoan(0);

    // Vérifier les soldes d'Alice et de Bob après le remboursement individuel
    const balAliceAfterIndividualPayBack = await USDC.balanceOf(alice.address);
    const bobBalanceAfterIndividualPayBack = await USDC.balanceOf(bob.address);

    // Vérifications finales pour le remboursement individuel
    expect(BigInt(bobBalanceBeforeRepayment) - BigInt(bobBalanceAfterIndividualPayBack)).to.equal(BigInt(borrowAmount));
    expect(BigInt(balAliceAfterIndividualPayBack) - BigInt(balAliceAfterBorrow)).to.equal(BigInt(borrowAmount));

  });
});
