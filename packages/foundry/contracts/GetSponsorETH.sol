pragma solidity ^0.8.10;

interface GetSponsorETH {
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
    event Claimed(uint256 indexed sponsorshipId, address indexed token);
    event Config(uint256 indexed idx, string valName, string value);
    event Fund(
        uint256 indexed idx, address indexed token, address indexed fromm, bool isStaking, string author, string message
    );
    event NewSponsor(uint256 indexed idx, address indexed owner, string pledge);
    event OwnershipTransferred(address indexed previous_owner, address indexed new_owner);
    event RoleMinterChanged(address indexed minter, bool status);
    event StakeWithdrawn(uint256 indexed sponsorshipId, address indexed token, address indexed staked);
    event TokenAllowanceUpdate(address token, bool isAllowed);
    event TransferBatch(
        address indexed operator, address indexed owner, address indexed to, uint256[] ids, uint256[] amounts
    );
    event TransferSingle(
        address indexed operator, address indexed owner, address indexed to, uint256 id, uint256 amount
    );
    event URI(string value, uint256 indexed id);

    function balanceOf(address owner, uint256 id) external view returns (uint256);
    function balanceOfBatch(address[] memory owners, uint256[] memory ids) external view returns (uint256[] memory);
    function burn(address owner, uint256 id, uint256 amount) external;
    function burn_batch(address owner, uint256[] memory ids, uint256[] memory amounts) external;
    function claim(uint256 sponsorship_id, address token) external;
    function createSponsor(uint256 time_to_expiry, string memory pledge, bool is_perpetual, string[] memory configs)
        external;
    function exists(uint256 id) external view returns (bool);
    function fund(
        uint256 sponsorship_id,
        address token,
        bool is_staking,
        uint256 amount,
        string memory user,
        string memory message
    ) external payable;
    function getClaim(uint256 sponsorship_id, address token) external view returns (uint256);
    function isAllowedToken(address arg0) external view returns (bool);
    function isApprovedForAll(address arg0, address arg1) external view returns (bool);
    function is_minter(address arg0) external view returns (bool);
    function lendingPool() external view returns (address);
    function owner() external view returns (address);
    function ownerOf(uint256 arg0) external view returns (address);
    function renounce_ownership() external;
    function safeBatchTransferFrom(
        address owner,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) external;
    function safeTransferFrom(address owner, address to, uint256 id, uint256 amount, bytes memory data) external;
    function safe_mint(address owner, uint256 id, uint256 amount, bytes memory data) external;
    function safe_mint_batch(address owner, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        external;
    function setApprovalForAll(address operator, bool approved) external;
    function setConfigs(uint256 sponsor_id, string[] memory configs) external;
    function set_minter(address minter, bool status) external;
    function set_uri(uint256 id, string memory token_uri) external;
    function sponsoredPools(uint256 arg0) external view returns (address);
    function sponsorships(uint256 idx) external view returns (uint256, uint256, uint256, string memory, bool);
    function supportsGetSponsorETH(bytes4 interface_id) external view returns (bool);
    function total_supply(uint256 arg0) external view returns (uint256);
    function transfer_ownership(address new_owner) external;
    function updateAllowed(address token, address a_token, bool is_allowed, uint256 min_amount) external;
    function uri(uint256 id) external view returns (string memory);
    function weth() external view returns (address);
    function withdrawStake(uint256 sponsorship_id, address token) external;
}

