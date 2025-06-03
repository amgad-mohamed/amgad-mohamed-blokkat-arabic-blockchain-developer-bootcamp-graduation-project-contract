"use client";

import * as React from "react";
import { useWriteContract } from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../app/lib/contract";
import toast from "react-hot-toast";

export default function Vote() {
  const { writeContractAsync } = useWriteContract();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const pollId = Number(formData.get("pollId"));
    const option = Number(formData.get("option"));

    if (isNaN(pollId) || isNaN(option)) {
      toast.error("Invalid input. Poll ID and Option must be numbers.");
      return;
    }

    const votePromise = writeContractAsync({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "vote",
      args: [pollId, option],
    });

    toast.promise(votePromise, {
      loading: "Submitting vote...",
      success: (tx) => `Vote submitted! Tx hash: ${tx}`,
      error: (err) => {
        toast.error("Vote failed:", err);
        return `Vote failed: ${
          err.shortMessage || err.message || "Unknown error"
        }`;
      },
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold">Vote</h2>

      <input
        name="pollId"
        type="number"
        placeholder="Poll ID"
        required
        className="border p-2 block w-full"
      />

      <input
        name="option"
        type="number"
        placeholder="Option"
        required
        className="border p-2 block w-full"
      />

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        Vote
      </button>
    </form>
  );
}
