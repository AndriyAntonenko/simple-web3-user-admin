export const whitelistSchema = {
  body: {
    type: "object",
    properties: {
      address: { type: "string", pattern: "^0x[a-fA-F0-9]{40}$" },
    },
    required: ["address"],
  },
};
