// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library VotingTypes {
    
    struct Poll {
        string name;
        mapping(address => bool) hasVoted;
        uint256[] votes;
        string[] optionNames;
        bool exists;
        uint256 expiresAt;
    }

    struct PollView {
        string name;
        uint256 optionCount;
        string[] optionNames;
        uint256[] votes;
        uint256 expiresAt;
        bool isActive;
    }
}
