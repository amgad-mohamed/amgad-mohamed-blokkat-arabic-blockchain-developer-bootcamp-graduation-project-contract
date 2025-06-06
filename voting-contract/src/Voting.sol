// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./VotingTypes.sol";

contract Voting is Ownable {
    using VotingTypes for *;

    error Voting__CallerNotAuthorized();
    error Voting__InvalidPollOptions();
    error Voting__PollNotFound();
    error Voting__PollAlreadyExpired();
    error Voting__PollNotActive();
    error Voting__CannotShortenPoll();

    mapping(uint256 => VotingTypes.Poll) private polls;
    uint256 public pollCount;

    event PollCreated(
        uint256 indexed pollId,
        string name,
        uint256 optionCount,
        string[] optionNames,
        uint256 expiresAt
    );
    event Voted(uint256 pollId, address voter, uint256 option);
    event PollDeleted(uint256 pollId);
    event PollUpdated(uint256 pollId, string newName, uint256 newExpiresAt);
    event PollEnded(uint256 pollId, uint256[] finalVotes);

    constructor() Ownable(msg.sender) {}

    modifier isPollValid(
        string[] memory _optionNames,
        uint256 _durationSeconds
    ) {
        if (msg.sender != owner()) revert Voting__CallerNotAuthorized();
        if (_optionNames.length == 0 || _durationSeconds == 0) {
            revert Voting__InvalidPollOptions();
        }
        for (uint256 i = 0; i < _optionNames.length; i++) {
            require(bytes(_optionNames[i]).length > 0, "Empty option name");
        }
        _;
    }

    function createPoll(
        string calldata _name,
        string[] memory _optionNames,
        uint256 _durationSeconds
    ) external isPollValid(_optionNames, _durationSeconds) {
        VotingTypes.Poll storage newPoll = polls[pollCount];
        newPoll.name = _name;
        newPoll.optionNames = _optionNames;
        newPoll.votes = new uint256[](_optionNames.length);
        newPoll.exists = true;
        newPoll.expiresAt = block.timestamp + _durationSeconds;

        emit PollCreated(
            pollCount,
            _name,
            _optionNames.length,
            _optionNames,
            newPoll.expiresAt
        );
        pollCount++;
    }

    function vote(uint256 _pollId, uint256 _option) external {
        if (_pollId >= pollCount) revert Voting__PollNotFound();
        VotingTypes.Poll storage poll = polls[_pollId];
        if (!poll.exists) revert Voting__PollNotFound();
        if (block.timestamp >= poll.expiresAt)
            revert Voting__PollAlreadyExpired();
        if (_option >= poll.votes.length) revert Voting__InvalidPollOptions();
        if (poll.hasVoted[msg.sender]) revert Voting__PollNotActive();

        poll.hasVoted[msg.sender] = true;
        poll.votes[_option]++;

        emit Voted(_pollId, msg.sender, _option);
    }

    function getPoll(uint256 _pollId)
        external
        view
        returns (VotingTypes.PollView memory)
    {
        require(_pollId < pollCount, "Invalid poll ID");
        VotingTypes.Poll storage p = polls[_pollId];

        return
            VotingTypes.PollView({
                name: p.name,
                optionCount: p.votes.length,
                optionNames: p.optionNames,
                votes: p.votes,
                expiresAt: p.expiresAt,
                isActive: block.timestamp < p.expiresAt
            });
    }

    function getAllPolls()
        external
        view
        returns (VotingTypes.PollView[] memory)
    {
        VotingTypes.PollView[] memory pollList = new VotingTypes.PollView[](
            pollCount
        );
        for (uint256 i = 0; i < pollCount; i++) {
            VotingTypes.Poll storage p = polls[i];
            pollList[i] = VotingTypes.PollView({
                name: p.name,
                optionCount: p.votes.length,
                optionNames: p.optionNames,
                votes: p.votes,
                expiresAt: p.expiresAt,
                isActive: block.timestamp < p.expiresAt
            });
        }
        return pollList;
    }
}
