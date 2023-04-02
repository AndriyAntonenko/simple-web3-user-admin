import { FastifyInstance } from "fastify";

import { WhitelistDto } from "./dtos";
import { whitelistSchema } from "./schema";
import { Whitelist } from "./whitelist";
import { UserAlreadyWhitelistedError } from "./errors";

export class WhitelistHttpController {
  public constructor(private readonly whitelist: Whitelist) {}

  public init(http: FastifyInstance): void {
    http.post<{ Body: WhitelistDto }>(
      "/users",
      { schema: whitelistSchema },
      async (request, reply) => {
        try {
          await this.whitelist.add(request.body.address);
          reply.status(200);
        } catch (err) {
          if (err instanceof UserAlreadyWhitelistedError) {
            reply.status(400).send("User already whitelisted");
          }
          throw err;
        }
      }
    );
  }
}
