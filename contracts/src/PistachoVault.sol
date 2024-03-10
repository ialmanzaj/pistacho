// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import { ERC4626 } from "solmate/mixins/ERC4626.sol";
import { ERC20 } from "solmate/tokens/ERC20.sol";

contract PistachoVault is ERC4626 {
    uint256 public fundingRaised;
    mapping(address => uint256) public projectsOwners;
    mapping(uint256 => uint256) public projectsFunds;

    constructor(address _asset, string memory _name, string memory _symbol) ERC4626(ERC20(_asset), _name, _symbol) { }

    function fund(uint256 assets, uint256 projectId) external returns (uint256 shares) {
        require((shares = previewDeposit(assets)) != 0, "ZERO_SHARES");
        asset.transferFrom(msg.sender, address(this), assets);
        projectsFunds[projectId] += assets;
        fundingRaised += assets;
        _mint(msg.sender, shares);
        emit Deposit(msg.sender, msg.sender, assets, shares);
        afterDeposit(assets, shares);
    }

     // returns total number of assets
    function totalAssets() public view override returns (uint256) {
        return asset.balanceOf(address(this));
    }

    // returns total balance of user
    function totalAssetsOfUser(address _user) public view returns (uint256) {
        return asset.balanceOf(_user);
    }


}
