// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/Voting.sol";
import "../src/VotingTypes.sol";

contract VotingTest is Test {
    Voting public voting;

    address public owner = address(this);
    address public voter1 = address(0x1);
    address public voter2 = address(0x2);

    function setUp() public {
        voting = new Voting();
    }

    function testCreatePoll() public {
        string[] memory options = new string[](2);
        options[0] = "Option A";
        options[1] = "Option B";

        voting.createPoll("Test Poll", options, 3600);

        VotingTypes.PollView memory poll = voting.getPoll(0);

        assertEq(poll.name, "Test Poll");
        assertEq(poll.optionCount, 2);
        assertEq(poll.optionNames[0], "Option A");
        assertEq(poll.optionNames[1], "Option B");
        assertEq(poll.votes[0], 0);
        assertEq(poll.votes[1], 0);
        assertTrue(poll.isActive);
        assertGt(poll.expiresAt, block.timestamp);
    }

    function testRevertCreatePollWithEmptyOptions() public {
        string[] memory options = new string[](0); 
        vm.expectRevert(
            abi.encodeWithSelector(Voting.Voting__InvalidPollOptions.selector)
        );
        voting.createPoll("Empty Poll", options, 3600);
    }

    function testVote() public {
        string[] memory options = new string[](2); 
        options[0] = "Yes";
        options[1] = "No";

        voting.createPoll("Vote Poll", options, 3600);

        vm.prank(voter1);
        voting.vote(0, 0); // Vote "Yes"

        VotingTypes.PollView memory poll = voting.getPoll(0);
        assertEq(poll.votes[0], 1);
        assertEq(poll.votes[1], 0);
    }

    function testRevertDoubleVote() public {
        string[] memory options = new string[](2); // Declare and initialize options array
        options[0] = "Yes";
        options[1] = "No";

        voting.createPoll("Vote Poll", options, 3600);

        vm.startPrank(voter1);
        voting.vote(0, 1); // First vote
        vm.expectRevert(
            abi.encodeWithSelector(Voting.Voting__PollNotActive.selector)
        );
        voting.vote(0, 1); // Should revert
        vm.stopPrank();
    }

    function testGetAllPolls() public {
        string[] memory options = new string[](2); // Declare and initialize options array
        options[0] = "Apple";
        options[1] = "Banana";

        voting.createPoll("Fruit Poll", options, 1800);
        voting.createPoll("Fruit Poll 2", options, 3600);

        VotingTypes.PollView[] memory polls = voting.getAllPolls();

        assertEq(polls.length, 2);
        assertEq(polls[0].name, "Fruit Poll");
        assertEq(polls[1].name, "Fruit Poll 2");
    }
}
