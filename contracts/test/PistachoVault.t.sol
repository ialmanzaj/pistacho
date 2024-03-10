// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import { PRBTest } from "@prb/test/src/PRBTest.sol";
import { console2 } from "forge-std/src/console2.sol";
import { StdCheats } from "forge-std/src/StdCheats.sol";

import { PistachoVault } from "../src/PistachoVault.sol";

/// @dev If this is your first time with Forge, read this tutorial in the Foundry Book:
/// https://book.getfoundry.sh/forge/writing-tests
contract PistachoVaultTest is PRBTest, StdCheats {
    address USDC = address(1234);
    PistachoVault internal vault;

    /// @dev A function invoked before each test case is run.
    function setUp() public virtual {
        // Instantiate the contract-under-test.
        vault = new PistachoVault(USDC, "PistachoVault", "vPistacho");
    }
}
