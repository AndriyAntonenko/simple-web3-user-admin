import Fastify from "fastify";
import cors from "@fastify/cors";

import { getEnvConfig } from "./config";
import { WhitelistModule } from "./whitelist";

const config = getEnvConfig();
const fastify = Fastify({ logger: true });
fastify.register(cors, { origin: "*" });

WhitelistModule.init(fastify, {
  contractAddress: config.whitelist.contract,
  nodeUrl: config.nodeUrl,
  ownerPk: config.whitelist.ownerPk,
});

(async () => {
  try {
    await fastify.listen({ host: config.host, port: config.port });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
