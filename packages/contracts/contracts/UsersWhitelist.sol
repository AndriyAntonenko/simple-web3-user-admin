// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract UsersWhitelist is Ownable {
    error UserAlreadyListed(address user);
    mapping(address => bool) whitelist;
    event WhitelistUpdated(
        address indexed user,
        uint256 timestamp,
        bool indexed added,
        bool indexed removed
    );

    function add(address user) external onlyOwner {
        if (whitelist[user]) {
            revert UserAlreadyListed(user);
        }

        whitelist[user] = true;
        emit WhitelistUpdated(user, block.timestamp, true, false);
    }

    function remove(address user) external onlyOwner {
        delete whitelist[user];
        emit WhitelistUpdated(user, block.timestamp, false, true);
    }

    function verify(address user) external view returns (bool) {
        return whitelist[user];
    }
}
