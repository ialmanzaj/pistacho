// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import { ERC4626 } from "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PistachoVault is ERC4626, Ownable {
    mapping(address => uint256) public shareHolders;

    constructor(ERC20 _asset, string memory _name, string memory _symbol) ERC4626(_asset) ERC20(_name, _symbol) { }
}
