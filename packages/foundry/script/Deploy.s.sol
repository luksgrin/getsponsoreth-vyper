//SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "../contracts/YourContract.sol";
import "./DeployHelpers.s.sol";
import {Script} from "forge-std/Script.sol";
import {SnekSmith, _CheatCodes} from "sneksmith/SnekSmith.sol";

contract DeployScript is Script, SnekSmith, ScaffoldETHDeploy {

    _CheatCodes private cheatCodes = _CheatCodes(VM_ADDRESS);

    // Goerli WETH address
    address public WETH_address = 0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6;
    // Goerli AAVE WETH address
    address public AAVE_WETH_address = 0x22404B0e2a7067068AcdaDd8f9D586F834cCe2c5;
    // Goerli lending pool address
    address public lendingPoolAddress = 0x4bd5643ac6f66a5237E18bfA7d47cF22f1c9F210;

    error InvalidPrivateKey(string);

    function run() external returns (
        Deployment[] memory
    ) {
        uint256 deployerPrivateKey = setupLocalhostEnv();
        if (deployerPrivateKey == 0) {
            revert InvalidPrivateKey(
                "You don't have a deployer account. Make sure you have set DEPLOYER_PRIVATE_KEY in .env or use `yarn generate` to generate a new random account"
            );
        }
        vm.startBroadcast(deployerPrivateKey);
        YourContract yourContract = new YourContract(
            vm.addr(deployerPrivateKey)
        );
        console.logString(
            string.concat(
                "YourContract deployed at: ",
                vm.toString(address(yourContract))
            )
        );
        deployments.push(
            Deployment({name: "YourContract", addr: address(yourContract)})
        );

        address sponsoredPools = createBlueprint(
            "contracts/",
            "SponsoredPools"
        );
        address getSponsorETH = createContract(
            "contracts/",
            "GetSponsorETH",
            abi.encode(
                lendingPoolAddress,
                WETH_address,
                AAVE_WETH_address,
                sponsoredPools
            )
        );
        deployments.push(
            Deployment({name: "SponsoredPools", addr: address(sponsoredPools)})
        );
        deployments.push(
            Deployment({name: "GetSponsorETH", addr: address(getSponsorETH)})
        );
        console.logString(
            string.concat(
                "sponsoredPoolsBlueprint deployed at: ",
                vm.toString(address(sponsoredPools))
            )
        );
        console.logString(
            string.concat(
                "getSponsorETH deployed at: ",
                vm.toString(address(getSponsorETH))
            )
        );
        vm.stopBroadcast();

        /**
         * This function generates the file containing the contracts Abi definitions.
         * These definitions are used to derive the types needed in the custom scaffold-eth hooks, for example.
         * This function should be called last.
         */
        exportDeployments();

        return deployments;
    }

    function test() public {}
}
