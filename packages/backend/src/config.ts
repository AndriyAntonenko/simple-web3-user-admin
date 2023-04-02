import dotenv from "dotenv";

export interface Config {
  whitelist: {
    contract: string;
    ownerPk: string;
  };

  nodeUrl: string;
  host: string;
  port: number;
}

export function getEnvConfig(): Config {
  dotenv.config();

  if (!process.env.WHITELIST_OWNER_PK)
    throw new Error("WHITELIST_OWNER_PK is not provided");

  if (!process.env.NODE_URL) throw new Error("NODE_URL is not provided");

  if (!process.env.WHITELIST_CONTRACT_ADDRESS)
    throw new Error("WHITELIST_CONTRACT_ADDRESS is not provided");

  return {
    whitelist: {
      contract: process.env.WHITELIST_CONTRACT_ADDRESS,
      ownerPk: process.env.WHITELIST_OWNER_PK,
    },
    nodeUrl: process.env.NODE_URL,
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    host: process.env.HOST ?? "127.0.0.1",
  };
}
