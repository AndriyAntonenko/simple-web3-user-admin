import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("UsersWhitelist", function () {
  async function deployWhitelistFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const UsersWhitelist = await ethers.getContractFactory("UsersWhitelist");
    const whitelist = await UsersWhitelist.deploy();

    return { whitelist, owner, otherAccount };
  }

  it("Should revert whitelisting from non-owner account", async function () {
    const { whitelist, otherAccount } = await loadFixture(
      deployWhitelistFixture
    );
    await whitelist.connect(otherAccount);

    expect(
      whitelist.connect(otherAccount).add(otherAccount.address)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("Should whitelist successfully ", async function () {
    const { whitelist, otherAccount, owner } = await loadFixture(
      deployWhitelistFixture
    );

    const tx = await whitelist.connect(owner).add(otherAccount.address);
    await tx.wait();

    expect(
      await whitelist.connect(owner).verify(otherAccount.address)
    ).to.be.eq(true);
  });

  it("Should emit WhitelistUpdated event on successful whitelisting", async function () {
    const { whitelist, otherAccount, owner } = await loadFixture(
      deployWhitelistFixture
    );
    expect(whitelist.connect(owner).add(otherAccount.address)).to.emit(
      whitelist,
      "WhitelistUpdated"
    );
  });

  it("Should revert with custom error UserAlreadyListed", async function () {
    const { whitelist, otherAccount, owner } = await loadFixture(
      deployWhitelistFixture
    );

    const tx = await whitelist.connect(owner).add(otherAccount.address);
    await tx.wait();
    await expect(
      whitelist.connect(owner).add(otherAccount.address)
    ).to.revertedWithCustomError(whitelist, "UserAlreadyListed");
  });

  it("Should emit WhitelistUpdated on remove", async function () {
    const { whitelist, otherAccount, owner } = await loadFixture(
      deployWhitelistFixture
    );

    // add user
    await whitelist
      .connect(owner)
      .add(otherAccount.address)
      .then((tx) => tx.wait());

    expect(whitelist.connect(owner).remove(otherAccount.address)).to.emit(
      whitelist,
      "WhitelistUpdated"
    );
  });

  it("Should remove whitelisted user successfully", async function () {
    const { whitelist, otherAccount, owner } = await loadFixture(
      deployWhitelistFixture
    );

    // add user
    await whitelist
      .connect(owner)
      .add(otherAccount.address)
      .then((tx) => tx.wait());

    // remove user
    await whitelist
      .connect(owner)
      .remove(otherAccount.address)
      .then((tx) => tx.wait());

    // verify
    expect(
      await whitelist.connect(owner).verify(otherAccount.address)
    ).to.be.eq(false);
  });
});
