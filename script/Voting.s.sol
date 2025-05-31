// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "forge-std/console.sol"; // Added for console.log
import "../src/Voting.sol";

contract VotingScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        Voting voting = new Voting();
        console.log("Voting contract deployed at:", address(voting));

        string memory pollName = "Favorite Color";
        string[] memory options = new string[](2);
        options[0] = "Red";
        options[1] = "Blue";
        voting.createPoll(pollName, options, 3600); // Added 3600 as duration in seconds
        console.log("Sample poll created with ID 0");

        vm.stopBroadcast();
    }
}