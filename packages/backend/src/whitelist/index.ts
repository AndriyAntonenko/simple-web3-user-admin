import { FastifyInstance } from "fastify";

import { Whitelist } from "./whitelist";
import { WhitelistHttpController } from "./controller";

export interface WhitelistModuleConfig {
  ownerPk: string;
  contractAddress: string;
  nodeUrl: string;
}

export class WhitelistModule {
  static init(http: FastifyInstance, config: WhitelistModuleConfig) {
    const whitelist = new Whitelist(
      config.ownerPk,
      config.contractAddress,
      config.nodeUrl
    );

    const controller = new WhitelistHttpController(whitelist);
    controller.init(http);
  }
}
