"use client";

import { useState } from "react";
import { useReadContract } from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../app/lib/contract";

export default function PollResults() {
  const [pollId, setPollId] = useState('');

  const { data: results }: { data: bigint[] | undefined } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getPollResults",
    args: [pollId],
  });

  return (
    <div>
      <h2>Poll Results</h2>
      <input
        type="text"
        placeholder="Poll ID"
        value={pollId}
        onChange={(e) => setPollId(e.target.value)}
        className="border p-2 w-full"
      />
      <div>
        {results?.map((count: bigint, index: number) => (
          <p key={index}>
            Option {index + 1}: {count.toString()} votes
          </p>
        ))}
      </div>
    </div>
  );
}
