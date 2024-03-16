import { createPublicClient, http, createClient } from "viem";
import { createPimlicoPaymasterClient } from "permissionless/clients/pimlico";
import { sepolia } from "viem/chains";
import { pimlicoBundlerActions } from "permissionless/actions/pimlico";
import { bundlerActions, ENTRYPOINT_ADDRESS_V07, ENTRYPOINT_ADDRESS_V06 } from "permissionless";

// export const ENTRYPOINT_ADDRESS_V06 = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";

// // https://github.com/safe-global/safe-modules-deployments/blob/main/src/assets/safe-4337-module/v0.2.0/add-modules-lib.json#L8
// export const ADD_MODULE_LIB_ADDRESS = "0x8EcD4ec46D4D2a6B64fE960B3D64e8B94B2234eb";

// // https://github.com/safe-global/safe-modules-deployments/blob/main/src/assets/safe-4337-module/v0.2.0/safe-4337-module.json#L8
// export const SAFE_4337_MODULE_ADDRESS = "0xa581c4A4DB7175302464fF3C06380BC3270b4037";

// // https://github.com/safe-global/safe-deployments/blob/main/src/assets/v1.4.1/safe_proxy_factory.json#L13
// export const SAFE_PROXY_FACTORY_ADDRESS = "0x4e1DCf7AD4e460CfD30791CCC4F9c8a4f820ec67";

// // https://github.com/safe-global/safe-deployments/blob/main/src/assets/v1.4.1/safe.json#L13
// export const SAFE_SINGLETON_ADDRESS = "0x41675C099F32341bf84BFc5382aF534df5C7461a";

// // https://github.com/safe-global/safe-deployments/blob/main/src/assets/v1.4.1/multi_send.json#L13
// export const SAFE_MULTISEND_ADDRESS = "0x38869bf66a61cF6bDB996A6aE40D5853Fd43B526";

export const PIMLICO_API_KEY = process.env.NEXT_PUBLIC_PIMLICO_KEY;

export const publicClient = createPublicClient({
  transport: http("https://rpc.ankr.com/eth_sepolia"),
});

export const paymasterClient = createPimlicoPaymasterClient({
  transport: http(`https://api.pimlico.io/v2/sepolia/rpc?apikey=${PIMLICO_API_KEY}`),
  entryPoint: ENTRYPOINT_ADDRESS_V06,
});

export const pimlicoBundlerClient = createClient({
  chain: sepolia,
  transport: http(`https://api.pimlico.io/v2/sepolia/rpc?apikey=${PIMLICO_API_KEY}`),
})
  .extend(bundlerActions(ENTRYPOINT_ADDRESS_V07))
  .extend(pimlicoBundlerActions(ENTRYPOINT_ADDRESS_V07));
