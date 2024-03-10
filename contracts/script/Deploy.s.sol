// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.23 <0.9.0;

import { PistachoVault } from "../src/PistachoVault.sol";
import { Pistacho } from "../src/Pistacho.sol";

import { BaseScript } from "./Base.s.sol";

/// @dev See the Solidity Scripting tutorial: https://book.getfoundry.sh/tutorials/solidity-scripting
contract Deploy is BaseScript {
    //fuji usdc
    address USDC = 0x5425890298aed601595a70AB815c96711a31Bc65;

    function run() public broadcast returns (PistachoVault vault) {
        vault = new PistachoVault(USDC, "VaultPistacho", "vPISTACHO");
    }
}
