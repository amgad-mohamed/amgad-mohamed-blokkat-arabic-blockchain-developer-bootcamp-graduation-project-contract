// 'use client';

// import { useWriteContract, useReadContract } from 'wagmi';
// import { sepolia } from 'wagmi/chains';

// interface PollCardProps {
//   poll: { id: number; name: string; optionNames: string[]; hasVoted: boolean };
//   contractAddress: `0x${string}`;
//   contractAbi: any;
// }

// export default function PollCard({ poll, contractAddress, contractAbi }: PollCardProps) {
//   const { writeContract } = useWriteContract();

//   const handleVote = (pollId: number, optionIndex: number) => {
//     writeContract({
//       address: contractAddress,
//       abi: contractAbi,
//       functionName: 'vote',
//       args: [BigInt(pollId), BigInt(optionIndex)],
//     });
//   };

//   const handleViewResults = async (pollId: number) => {
//     const { data: results } = useReadContract({
//       address: contractAddress,
//       abi: contractAbi,
//       functionName: 'getPollResults',
//       args: [BigInt(pollId)],
//       chainId: sepolia.id,
//     });
//     if (results) {
//       const [votes, optionNames] = results;
//       alert(
//         optionNames.map((opt: string, idx: number) => `${opt}: ${votes[idx]} votes`).join('\n')
//       );
//     }
//   };

//   return (
//     <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
//       <h3 className="text-xl font-semibold mb-4">{poll.name}</h3>
//       {poll.hasVoted ? (
//         <p className="text-gray-500">You have already voted.</p>
//       ) : (
//         <div className="space-y-2">
//           {poll.optionNames?.map((option: string, idx: number) => (
//             <button
//               key={idx}
//               onClick={() => handleVote(poll.id, idx)}
//               className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700"
//             >
//               Vote for {option}
//             </button>
//           ))}
//         </div>
//       )}
//       <button
//         onClick={() => handleViewResults(poll.id)}
//         className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
//       >
//         View Results
//       </button>
//     </div>
//   );
// }