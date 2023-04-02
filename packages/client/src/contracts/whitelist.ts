import { Contract, providers } from "ethers";
import abi from "./whitelist-abi.json";

function initWhitelistContract(): Contract {
  if (!process.env.REACT_APP_NODE_URL)
    throw new Error("REACT_APP_NODE_URL is not provided");
  if (!process.env.REACT_APP_WHITELIST_CONTRACT_ADDRESS)
    throw new Error("REACT_APP_WHITELIST_CONTRACT_ADDRESS is not provided");

  return new Contract(
    process.env.REACT_APP_WHITELIST_CONTRACT_ADDRESS,
    abi,
    new providers.JsonRpcProvider(process.env.REACT_APP_NODE_URL)
  );
}

export default initWhitelistContract();
