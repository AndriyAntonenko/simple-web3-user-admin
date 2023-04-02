import { Contract, providers, Wallet } from "ethers";

import abi from "./abi.json";
import { UserAlreadyWhitelistedError } from "./errors";

export class Whitelist {
  private readonly contract: Contract;
  private readonly owner: Wallet;
  private readonly provider: providers.JsonRpcProvider;

  constructor(ownerPk: string, address: string, nodeUrl: string) {
    this.provider = new providers.JsonRpcProvider(nodeUrl);
    this.owner = new Wallet(ownerPk, this.provider);
    this.contract = new Contract(address, abi);
  }

  public async add(address: string): Promise<void> {
    const isAddressAlreadyListed = await this.contract
      .connect(this.owner)
      .verify(address);

    if (isAddressAlreadyListed) throw new UserAlreadyWhitelistedError();
    const tx = await this.contract.connect(this.owner).add(address);
    await tx.wait();
  }
}
