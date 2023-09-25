pragma solidity ^0.8.10;

interface SponsoredPools {
    event OwnershipTransferred(address indexed previous_owner, address indexed new_owner);

    function beneficiary() external view returns (address);
    function claim(address token, address a_token) external;
    function claimable(address token, address a_token) external view returns (uint256);
    function iinit(address _lending_pool, address _sponsor_ETH, address _beneficiary) external;
    function lendingPool() external view returns (address);
    function owner() external view returns (address);
    function renounce_ownership() external;
    function sponsorETH() external view returns (address);
    function stake(address supporter, address token, uint256 amount) external payable;
    function supporters(address arg0) external view returns (uint256);
    function tokensStaked(address arg0, address arg1) external view returns (uint256);
    function totalStaked(address arg0) external view returns (uint256);
    function transfer_ownership(address new_owner) external;
    function unstake(address supporter, address token) external;
}

