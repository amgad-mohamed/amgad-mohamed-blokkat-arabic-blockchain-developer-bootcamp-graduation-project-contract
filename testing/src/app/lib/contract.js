// export const CONTRACT_ADDRESS = "0xE49B6105C4738eB3857e61D8fccC74Ca586188f6"; // replace with actual
// export const CONTRACT_ABI = [
//   { type: "constructor", inputs: [], stateMutability: "nonpayable" },
//   {
//     type: "function",
//     name: "createPoll",
//     inputs: [
//       { name: "_name", type: "string", internalType: "string" },
//       {
//         name: "_optionNames",
//         type: "string[]",
//         internalType: "string[]",
//       },
//       {
//         name: "_durationSeconds",
//         type: "uint256",
//         internalType: "uint256",
//       },
//     ],
//     outputs: [],
//     stateMutability: "nonpayable",
//   },
//   {
//     type: "function",
//     name: "getAllPolls",
//     inputs: [],
//     outputs: [
//       {
//         name: "",
//         type: "tuple[]",
//         internalType: "struct Voting.PollView[]",
//         components: [
//           { name: "name", type: "string", internalType: "string" },
//           {
//             name: "optionCount",
//             type: "uint256",
//             internalType: "uint256",
//           },
//           {
//             name: "optionNames",
//             type: "string[]",
//             internalType: "string[]",
//           },
//           {
//             name: "expiresAt",
//             type: "uint256",
//             internalType: "uint256",
//           },
//           { name: "isActive", type: "bool", internalType: "bool" },
//         ],
//       },
//     ],
//     stateMutability: "view",
//   },
//   {
//     type: "function",
//     name: "getOptionNames",
//     inputs: [{ name: "_pollId", type: "uint256", internalType: "uint256" }],
//     outputs: [{ name: "", type: "string[]", internalType: "string[]" }],
//     stateMutability: "view",
//   },
//   {
//     type: "function",
//     name: "getPollExpiry",
//     inputs: [{ name: "_pollId", type: "uint256", internalType: "uint256" }],
//     outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
//     stateMutability: "view",
//   },
//   {
//     type: "function",
//     name: "getPollName",
//     inputs: [{ name: "_pollId", type: "uint256", internalType: "uint256" }],
//     outputs: [{ name: "", type: "string", internalType: "string" }],
//     stateMutability: "view",
//   },
//   {
//     type: "function",
//     name: "getPollResults",
//     inputs: [{ name: "_pollId", type: "uint256", internalType: "uint256" }],
//     outputs: [
//       { name: "", type: "uint256[]", internalType: "uint256[]" },
//       { name: "", type: "string[]", internalType: "string[]" },
//     ],
//     stateMutability: "view",
//   },
//   {
//     type: "function",
//     name: "hasVoted",
//     inputs: [
//       { name: "_pollId", type: "uint256", internalType: "uint256" },
//       { name: "_voter", type: "address", internalType: "address" },
//     ],
//     outputs: [{ name: "", type: "bool", internalType: "bool" }],
//     stateMutability: "view",
//   },
//   {
//     type: "function",
//     name: "owner",
//     inputs: [],
//     outputs: [{ name: "", type: "address", internalType: "address" }],
//     stateMutability: "view",
//   },
//   {
//     type: "function",
//     name: "pollCount",
//     inputs: [],
//     outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
//     stateMutability: "view",
//   },
//   {
//     type: "function",
//     name: "renounceOwnership",
//     inputs: [],
//     outputs: [],
//     stateMutability: "nonpayable",
//   },
//   {
//     type: "function",
//     name: "transferOwnership",
//     inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
//     outputs: [],
//     stateMutability: "nonpayable",
//   },
//   {
//     type: "function",
//     name: "vote",
//     inputs: [
//       { name: "_pollId", type: "uint256", internalType: "uint256" },
//       { name: "_option", type: "uint256", internalType: "uint256" },
//     ],
//     outputs: [],
//     stateMutability: "nonpayable",
//   },
//   {
//     type: "event",
//     name: "OwnershipTransferred",
//     inputs: [
//       {
//         name: "previousOwner",
//         type: "address",
//         indexed: true,
//         internalType: "address",
//       },
//       {
//         name: "newOwner",
//         type: "address",
//         indexed: true,
//         internalType: "address",
//       },
//     ],
//     anonymous: false,
//   },
//   {
//     type: "event",
//     name: "PollCreated",
//     inputs: [
//       {
//         name: "pollId",
//         type: "uint256",
//         indexed: false,
//         internalType: "uint256",
//       },
//       {
//         name: "name",
//         type: "string",
//         indexed: false,
//         internalType: "string",
//       },
//       {
//         name: "optionCount",
//         type: "uint256",
//         indexed: false,
//         internalType: "uint256",
//       },
//       {
//         name: "optionNames",
//         type: "string[]",
//         indexed: false,
//         internalType: "string[]",
//       },
//       {
//         name: "expiresAt",
//         type: "uint256",
//         indexed: false,
//         internalType: "uint256",
//       },
//     ],
//     anonymous: false,
//   },
//   {
//     type: "event",
//     name: "Voted",
//     inputs: [
//       {
//         name: "pollId",
//         type: "uint256",
//         indexed: false,
//         internalType: "uint256",
//       },
//       {
//         name: "voter",
//         type: "address",
//         indexed: false,
//         internalType: "address",
//       },
//       {
//         name: "option",
//         type: "uint256",
//         indexed: false,
//         internalType: "uint256",
//       },
//     ],
//     anonymous: false,
//   },
//   {
//     type: "error",
//     name: "OwnableInvalidOwner",
//     inputs: [{ name: "owner", type: "address", internalType: "address" }],
//   },
//   {
//     type: "error",
//     name: "OwnableUnauthorizedAccount",
//     inputs: [{ name: "account", type: "address", internalType: "address" }],
//   },
// ];

export const CONTRACT_ADDRESS = "0x7971DF92724272b7e08083853965c6dbb6de6C31"; // replace with actual
export const CONTRACT_ABI = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    name: "createPoll",
    inputs: [
      { name: "_name", type: "string", internalType: "string" },
      {
        name: "_optionNames",
        type: "string[]",
        internalType: "string[]",
      },
      {
        name: "_durationSeconds",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getAllPolls",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct VotingTypes.PollView[]",
        components: [
          { name: "name", type: "string", internalType: "string" },
          {
            name: "optionCount",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "optionNames",
            type: "string[]",
            internalType: "string[]",
          },
          {
            name: "votes",
            type: "uint256[]",
            internalType: "uint256[]",
          },
          {
            name: "expiresAt",
            type: "uint256",
            internalType: "uint256",
          },
          { name: "isActive", type: "bool", internalType: "bool" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPoll",
    inputs: [{ name: "_pollId", type: "uint256", internalType: "uint256" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct VotingTypes.PollView",
        components: [
          { name: "name", type: "string", internalType: "string" },
          {
            name: "optionCount",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "optionNames",
            type: "string[]",
            internalType: "string[]",
          },
          {
            name: "votes",
            type: "uint256[]",
            internalType: "uint256[]",
          },
          {
            name: "expiresAt",
            type: "uint256",
            internalType: "uint256",
          },
          { name: "isActive", type: "bool", internalType: "bool" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "pollCount",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "vote",
    inputs: [
      { name: "_pollId", type: "uint256", internalType: "uint256" },
      { name: "_option", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PollCreated",
    inputs: [
      {
        name: "pollId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "name",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "optionCount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "optionNames",
        type: "string[]",
        indexed: false,
        internalType: "string[]",
      },
      {
        name: "expiresAt",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PollDeleted",
    inputs: [
      {
        name: "pollId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PollEnded",
    inputs: [
      {
        name: "pollId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "finalVotes",
        type: "uint256[]",
        indexed: false,
        internalType: "uint256[]",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PollUpdated",
    inputs: [
      {
        name: "pollId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "newName",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "newExpiresAt",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Voted",
    inputs: [
      {
        name: "pollId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "voter",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "option",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [{ name: "owner", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "OwnableUnauthorizedAccount",
    inputs: [{ name: "account", type: "address", internalType: "address" }],
  },
  { type: "error", name: "Voting__CallerNotAuthorized", inputs: [] },
  { type: "error", name: "Voting__CannotShortenPoll", inputs: [] },
  { type: "error", name: "Voting__InvalidPollOptions", inputs: [] },
  { type: "error", name: "Voting__PollAlreadyExpired", inputs: [] },
  { type: "error", name: "Voting__PollNotActive", inputs: [] },
  { type: "error", name: "Voting__PollNotFound", inputs: [] },
];
