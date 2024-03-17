import { usePrivy, useWallets, ConnectedWallet } from "@privy-io/react-auth";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Chain, createWalletClient, custom, http } from "viem";
import { signerToSafeSmartAccount } from "permissionless/accounts";
import { walletClientToSmartAccountSigner, ENTRYPOINT_ADDRESS_V06, createSmartAccountClient } from "permissionless";
import { createSmartAccountClient as createAlchemySmartAccountClient } from "@alchemy/aa-core";
import { getChainFromId } from "@/lib/utils";
import { PIMLICO_API_KEY, paymasterClient, pimlicoBundlerClient } from "@/lib/safe";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { baseSepolia, chiliz, sepolia } from "viem/chains";
import { WalletClientSigner, type SmartAccountSigner } from "@alchemy/aa-core";
import { createLightAccount } from "@alchemy/aa-accounts";
import { sponsorUserOperation, updateUserOpGasFields } from "@/lib/paymaster";

export let smartAccount: any;
export let smartAccountType: "safe" | "smartAccount";
let txInProgress = false;

export const sendSmartTransaction = async (to: string, value: bigint, data: string) => {
  if (txInProgress) return;
  txInProgress = true;
  console.log("Sending transaction", { to, value, data });
  try {
    if (smartAccountType === "safe") {
      console.log("Sending safe transaction");
      const tx = await smartAccount.sendTransaction({
        to,
        value,
        data,
      });
      console.log({ tx });
    } else {
      console.log("Sending smart account transaction");
      const tx = await smartAccount.sendUserOperation({
        uo: { target: to, data, value },
      });
      console.log({ tx });
    }
  } catch (e) {
    console.error(e);
  } finally {
    txInProgress = false;
  }
};

export function ConnectBtn() {
  const { user, login, logout, ready, authenticated } = usePrivy();
  const { wallets } = useWallets();
  const [wallet, setWallet] = useState<ConnectedWallet>();
  const [chainId, setChainId] = useState("11155111");
  const [chain, setChain] = useState<Chain>(sepolia);

  useEffect(() => {
    const setupSafe = async () => {
      if (!wallet) return;

      console.log("Setting up safe");
      const eip1193provider = await wallet.getEthereumProvider();
      const privyClient = createWalletClient({
        account: wallet.address as `0x${string}`,
        chain: sepolia,
        transport: custom(eip1193provider),
      });

      const signer = walletClientToSmartAccountSigner(privyClient);
      const safeAccountAddress = (localStorage.getItem(`safe-account-${wallet.address}`) as `0x${string}`) ?? undefined;
      console.log("Safe already created", safeAccountAddress !== undefined, safeAccountAddress);
      const safeAccount = await signerToSafeSmartAccount(privyClient, {
        entryPoint: ENTRYPOINT_ADDRESS_V06,
        signer,
        safeVersion: "1.4.1",
        address: safeAccountAddress,
      });

      const smartAccountClient = createSmartAccountClient({
        account: safeAccount,
        entryPoint: ENTRYPOINT_ADDRESS_V06,
        chain: sepolia,
        bundlerTransport: http(`https://api.pimlico.io/v1/sepolia/rpc?apikey=${PIMLICO_API_KEY}`),
        middleware: {
          gasPrice: async () => (await pimlicoBundlerClient.getUserOperationGasPrice()).fast,
          sponsorUserOperation: paymasterClient.sponsorUserOperation, // optional
        },
      });
      smartAccount = smartAccountClient;
      smartAccountType = "safe";
      console.log({ safeAccount });
      localStorage.setItem(`safe-account-${wallet.address}`, safeAccount.address);
      // await sendTransaction(wallet.address, BigInt(0), "0x");
    };

    const setupSmartAccount = async () => {
      if (!wallet) return;

      console.log("Setting up smart account");
      const eip1193provider = await wallet.getEthereumProvider();
      const privyClient = createWalletClient({
        account: wallet.address as `0x${string}`,
        chain: chain,
        transport: custom(eip1193provider),
      });
      const privySigner: SmartAccountSigner = new WalletClientSigner(privyClient, "json-rpc");
      const RPC_URL = process.env.NEXT_PUBLIC_BASE_RPC_URL;
      const transport = http(RPC_URL);
      const account = await createLightAccount({
        transport,
        chain: baseSepolia,
        signer: privySigner,
      });

      const smartAccountClient = createAlchemySmartAccountClient({
        transport,
        chain: baseSepolia,
        account: account,
        gasEstimator: async (struct) => ({
          ...struct,
          callGasLimit: BigInt(0),
          preVerificationGas: BigInt(0),
          verificationGasLimit: BigInt(0),
        }),
        paymasterAndData: {
          paymasterAndData: async (userop) => {
            // request sponsorship
            const paymasterResp = await sponsorUserOperation(userop, RPC_URL || "");
            // replace the gas fields
            const updatedUserOp = await updateUserOpGasFields(userop, paymasterResp);
            return {
              ...updatedUserOp,
              paymasterAndData: paymasterResp.paymasterAndData,
            };
          },
          dummyPaymasterAndData: () => "0x",
        },
      });
      smartAccountType = "smartAccount";
      smartAccount = smartAccountClient;
      console.log({ account });
      // await sendSmartTransaction(wallet.address, BigInt(0), "0x");
    };

    if (wallets.length > 0) {
      setWallet(wallets[0]);
      console.log({ user });
      if (chain === sepolia) setupSafe();
      if (chain === baseSepolia) setupSmartAccount();
      if (chain === chiliz) smartAccount = undefined;
    }
  }, [wallet, wallets, chain, chainId]);

  const handleChangeChain = async (chainId: string) => {
    await wallets[0].switchChain(parseFloat(chainId));
    setChain(getChainFromId(chainId));
    setChainId(chainId);
  };

  return (
    <div className="flex gap-3">
      {ready && authenticated && (
        <>
          <Select onValueChange={async (chain) => handleChangeChain(chain)} value={chainId}>
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Sepolia" defaultValue={"11155111"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="11155111">Ethereum</SelectItem>
              <SelectItem value="42161">Arbitrum</SelectItem>
              <SelectItem value="84532">Base</SelectItem>
            </SelectContent>
          </Select>
        </>
      )}
      {ready && authenticated && (
        <Button variant={"secondary"} onClick={logout}>
          {wallet?.address.slice(0, 6)}...{wallet?.address.slice(-4)}
        </Button>
      )}
      {ready && !authenticated && (
        <Button variant={"default"} className="bg-blue-500 text-white rounded-lg" onClick={login}>
          Sign in
        </Button>
      )}
    </div>
  );
}
