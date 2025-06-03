"use client";

import React, { useEffect, useState } from "react";
import {
  useWriteContract,
  useReadContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/app/lib/contract";
import { RadioGroup, RadioGroupItem } from "@/shared/radio-group";
import { Card, CardFooter, CardHeader } from "@/shared/card";
import { Button } from "@/shared/Button";
import toast from "react-hot-toast";
import { PollView } from "@/types/PollTypes";
import { useTransactionHandler } from "@/shared/utility/hooks/useTransactionHandler";

interface PollProps {
  pollId: string;
}

const Poll: React.FC<PollProps> = ({ pollId }) => {
  const [options, setOptions] = useState<
    { id: string; text: string; votes: bigint }[]
  >([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleError } = useTransactionHandler();

  const {
    writeContractAsync,
    data: txHash,
    isError: isWriteError,
    error: writeError,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError: isReceiptError,
    error: receiptError,
  } = useWaitForTransactionReceipt({ hash: txHash });

  const { data: poll, refetch: refetchPoll } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getPoll",
    args: [pollId],
  }) as { data: PollView | undefined; refetch: () => void };

  useEffect(() => {
    if (poll?.optionNames && poll.votes) {
      const newOptions = poll.optionNames.map((text, index) => ({
        id: index.toString(),
        text,
        votes: poll.votes[index] ?? BigInt(0),
      }));
      setOptions(newOptions);
    }
  }, [poll]);

  const isExpired = poll?.expiresAt
    ? Number(poll.expiresAt) * 1000 < Date.now()
    : false;
  const isActive = poll?.isActive && !isExpired;

  useEffect(() => {
    if (isConfirming) {
      toast.loading("Transaction pending...", { id: "tx-status" });
    }
    if (isConfirmed) {
      toast.success("Vote submitted successfully!", { id: "tx-status" });
      setIsSubmitting(false);
      refetchPoll();
    }
    if (isWriteError && writeError) {
      setIsSubmitting(false);
      toast.dismiss("tx-status");
      handleError(writeError);
    }
    if (isReceiptError && receiptError) {
      setIsSubmitting(false);
      toast.dismiss("tx-status");
      handleError(receiptError);
    }
  }, [
    isConfirming,
    isConfirmed,
    isWriteError,
    writeError,
    isReceiptError,
    receiptError,
    handleError,
    refetchPoll,
  ]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedOption || !pollId || !isActive) {
      if (!isActive)
        toast.error("This poll is no longer active or has expired.");
      return;
    }
    setIsSubmitting(true);
    try {
      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "vote",
        args: [Number(pollId), Number(selectedOption)],
      });
    } catch (err) {
      setIsSubmitting(false);
      toast.dismiss("tx-status");
      handleError(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <Card className="border shadow-sm animate-fade-in">
        <CardHeader className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">
            {poll?.name || "Loading..."}
          </h2>
          <p className="text-gray-600 text-sm">
            {poll ? (
              isActive ? (
                "Select an option to vote"
              ) : (
                <span className="text-red-500">
                  This poll is {isExpired ? "expired" : "inactive"}.
                </span>
              )
            ) : (
              "Loading poll data..."
            )}
          </p>
          {poll?.expiresAt && (
            <p className="text-gray-500 text-sm">
              Expires:{" "}
              {new Date(Number(poll.expiresAt) * 1000).toLocaleString()}
            </p>
          )}
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <RadioGroup
            value={selectedOption || ""}
            onValueChange={setSelectedOption}
            className="space-y-3"
            disabled={!isActive || isSubmitting || isConfirming}
          >
            {options.map(({ id, text, votes }) => (
              <div
                key={id}
                className={`flex mx-6 items-center border rounded-md p-3 transition-all duration-200 ${
                  selectedOption === id
                    ? "border-vote-primary bg-vote-light"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <RadioGroupItem
                  value={id}
                  id={id}
                  className="mr-3"
                  disabled={!isActive || isSubmitting || isConfirming}
                />
                <label htmlFor={id} className="flex-1 text-base cursor-pointer">
                  {text} ({votes.toString()} votes)
                </label>
              </div>
            ))}
          </RadioGroup>
          <CardFooter className="pt-8">
            <Button
              type="submit"
              variant="customBlue"
              className="w-full"
              disabled={
                !selectedOption || isSubmitting || isConfirming || !isActive
              }
            >
              {isSubmitting || isConfirming ? "Submitting..." : "Submit Vote"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Poll;
