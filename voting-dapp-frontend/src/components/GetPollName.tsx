"use client";

import { useState } from "react";
import { useReadContract } from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../app/lib/contract";
import toast from "react-hot-toast";

export function GetPollName() {
  const [pollId, setPollId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [pollName, setPollName] = useState<string | null>(null);

  const { refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getPollName",
    args: [Number(pollId)],
  });

  const handleFetch = async () => {
    if (pollId !== "") {
      setLoading(true);
      try {
        const result = await refetch();
        setPollName(result.data as string); // Access the 'data' property
      } catch (error) {
        toast.error(`Error fetching poll name: ${error instanceof Error ? error.message : String(error)}`);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="space-y-2">
      <h2 className="font-semibold">Get Poll Name</h2>
      <input
        type="text"
        placeholder="Poll ID"
        value={pollId}
        onChange={(e) => setPollId(e.target.value)}
        className="border p-2 w-full"
      />
      <button
        onClick={handleFetch}
        disabled={loading}
        className={`px-4 py-1 rounded ${
          loading
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-blue-600 text-white"
        }`}
      >
        {loading ? "Loading..." : "Fetch Name"}
      </button>
      {pollName && <p className="text-green-600">Poll Name: {pollName}</p>}
    </div>
  );
}
