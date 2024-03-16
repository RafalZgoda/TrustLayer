import { deepHexlify, resolveProperties } from "@alchemy/aa-core";
import axios from "axios";
import { ENTRYPOINT_ADDRESS_V06 } from "permissionless";

export const paymasterRequest = (userOp: any) => {
  return {
    jsonrpc: "2.0",
    method: "pm_sponsorUserOperation",
    id: "1",
    params: [userOp, ENTRYPOINT_ADDRESS_V06],
  };
};

export const sponsorUserOperation = async (userOp: any, rpcUrl: string) => {
  // resolve the promise fields on userOp
  // https://github.com/alchemyplatform/aa-sdk/blob/main/packages/core/src/middleware/defaults/gasEstimator.ts#L11C5-L11C66
  const resolvedUserOp = deepHexlify(await resolveProperties(userOp));

  const req = paymasterRequest(resolvedUserOp);
  console.log({ req });
  const res = await axios.post(rpcUrl, req);
  return res.data.result;
};

export const updateUserOpGasFields = async (userop: any, paymasterResp: any) => {
  const updatedUserOp = {
    ...userop,
  };
  updatedUserOp.callGasLimit = paymasterResp.callGasLimit;
  updatedUserOp.preVerificationGas = paymasterResp.preVerificationGas;
  updatedUserOp.verificationGasLimit = paymasterResp.verificationGasLimit;
  return deepHexlify(await resolveProperties(updatedUserOp));
};
