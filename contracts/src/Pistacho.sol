// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Pistacho is ERC20 {
    constructor() ERC20("PISTACHO", "PISTACHO") { }

    function mint(address recipient, uint256 amount) external {
        _mint(recipient, amount);
    }

    function decimals() public view virtual override returns (uint8) {
        return 18;
    }
}
