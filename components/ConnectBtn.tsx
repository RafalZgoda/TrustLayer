import { usePrivy, useWallets, ConnectedWallet } from "@privy-io/react-auth";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Chain, createWalletClient, custom, http } from "viem";
import { signerToSafeSmartAccount } from "permissionless/accounts";
import { walletClientToSmartAccountSigner, ENTRYPOINT_ADDRESS_V06, createSmartAccountClient } from "permissionless";
import { getChainFromId } from "@/lib/utils";
import { PIMLICO_API_KEY, paymasterClient, pimlicoBundlerClient } from "@/lib/safe";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { sepolia } from "viem/chains";

export let smartAccount: any;
export let currentChain: Chain;

export function ConnectBtn() {
  const { login, logout, ready, authenticated } = usePrivy();
  const { wallets } = useWallets();
  const [wallet, setWallet] = useState<ConnectedWallet>();
  const [chain, setChain] = useState("11155111");

  useEffect(() => {
    const setupSafe = async () => {
      if (!wallet) return;

      console.log("Setting up safe");
      const eip1193provider = await wallet.getEthereumProvider();
      const privyClient = createWalletClient({
        account: wallet.address as `0x${string}`,
        chain: currentChain,
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
        chain: currentChain,
        bundlerTransport: http(`https://api.pimlico.io/v1/sepolia/rpc?apikey=${PIMLICO_API_KEY}`),
        middleware: {
          gasPrice: async () => (await pimlicoBundlerClient.getUserOperationGasPrice()).fast,
          sponsorUserOperation: paymasterClient.sponsorUserOperation, // optional
        },
      });
      smartAccount = smartAccountClient;

      console.log({ safeAccount });
      localStorage.setItem(`safe-account-${wallet.address}`, safeAccount.address);
      // const tx = await smartAccountClient.sendTransaction({
      //   to: "0x0000000000000000000000000000000000000000",
      //   data: "0x",
      //   value: BigInt(0),
      // });

      // console.log({ tx });
    };

    if (wallets.length > 0) {
      setWallet(wallets[0]);
      currentChain = getChainFromId(wallets[0].chainId.split(":")[1]);

      if (currentChain === sepolia) setupSafe();
    }
  }, [wallet, wallets]);

  const handleChangeChain = async (chainId: string) => {
    setChain(chainId);
    await wallets[0].switchChain(parseFloat(chainId));
  };

  return (
    <div className="flex gap-3">
      {ready && authenticated && (
        <>
          <Select onValueChange={async (chain) => handleChangeChain(chain)} value={chain}>
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Sepolia" defaultValue={"11155111"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="11155111">Ethereum</SelectItem>
              <SelectItem value="421614">Arbitrum</SelectItem>
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
          Connect Wallet
        </Button>
      )}
    </div>
  );
}
