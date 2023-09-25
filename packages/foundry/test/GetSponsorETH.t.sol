pragma solidity ^0.8.21;

import {Test} from "forge-std/Test.sol";
import {console} from "forge-std/console.sol";
import {DeployScript} from "script/Deploy.s.sol";
import {GetSponsorETH} from "contracts/GetSponsorETH.sol";
import {SponsoredPools} from "contracts/SponsoredPools.sol";
import {ScaffoldETHDeploy} from "script/DeployHelpers.s.sol";

contract TestGetSponsorETH is Test, ScaffoldETHDeploy {
    DeployScript deployer;
    GetSponsorETH getSponsorETH;
    SponsoredPools sponsoredPools;

    function setUp() public {
        deployer = new DeployScript();

        Deployment[] memory deployerDeployments;

        (
            deployerDeployments
        ) = deployer.run();
        getSponsorETH = GetSponsorETH(payable(deployerDeployments[0].addr));
        sponsoredPools = SponsoredPools(payable(deployerDeployments[1].addr));
    }

    // Test wether it crashes
    function testDeployGetSponsorETH() public view {
        /*Deployed in setUp*/
        console.log("sponsoredPools:", address(sponsoredPools));
        console.log("getSponsorETH:", address(getSponsorETH));
    }
}