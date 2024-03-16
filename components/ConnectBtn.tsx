import { usePrivy, useWallets, ConnectedWallet } from "@privy-io/react-auth";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { createWalletClient, custom, http } from "viem";
import { signerToSafeSmartAccount } from "permissionless/accounts";
import { walletClientToSmartAccountSigner, ENTRYPOINT_ADDRESS_V06, createSmartAccountClient } from "permissionless";
import { getChainFromId } from "@/lib/utils";
import { sepolia } from "viem/chains";
import { PIMLICO_API_KEY, paymasterClient, pimlicoBundlerClient } from "@/lib/safe";

export let smartAccount: any;

export function ConnectBtn() {
  const { login, logout, ready, authenticated } = usePrivy();
  const { wallets } = useWallets();
  const [wallet, setWallet] = useState<ConnectedWallet>();

  useEffect(() => {
    const setupSafe = async () => {
      if (!wallet) return;
      if (getChainFromId(wallet.chainId.split(":")[1]) !== sepolia) return;
      console.log("Setting up safe");
      const eip1193provider = await wallet.getEthereumProvider();
      const privyClient = createWalletClient({
        account: wallet.address as `0x${string}`,
        chain: sepolia,
        transport: custom(eip1193provider),
      });

      const signer = walletClientToSmartAccountSigner(privyClient);
      const safeAccount = await signerToSafeSmartAccount(privyClient, {
        entryPoint: ENTRYPOINT_ADDRESS_V06,
        signer,
        safeVersion: "1.4.1",
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

      // await smartAccountClient.sendTransaction({
      //   to: "0x0000000000000000000000000000000000000000",
      //   data: "0x",
      //   value: BigInt(0),
      // });
    };

    if (wallets.length > 0) {
      setWallet(wallets[0]);
      setupSafe();
    }
  }, [wallet, wallets]);

  return (
    <div className="w-44 flex gap-3">
      {/* {ready && authenticated && (
        <>
          <Select onValueChange={async (chain) => handleChangeChain(chain)} value={chain}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Goerli" defaultValue={"5"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">Goerli</SelectItem>
              <SelectItem value="534351">Scroll</SelectItem>
              <SelectItem value="1442">Polygon ZkEVM</SelectItem>
              <SelectItem value="5001">Mantle</SelectItem>
            </SelectContent>
          </Select>
        </>
      )} */}
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
