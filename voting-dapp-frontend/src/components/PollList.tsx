"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/shared/card";
import { Button } from "@/shared/Button";
import { PillIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { useReadContract } from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/app/lib/contract";
import { Input } from "@/shared/input";

// Smart contract Poll type
type RawPoll = {
  name: string;
  optionCount: bigint;
  isActive: boolean;
  expiresAt: bigint;
  optionNames: string[];
  votes: bigint[];
};

const PollList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: polls,
    isLoading,
    isError,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getAllPolls",
  });

  // Filter polls based on search term
  const filteredPolls = (polls as RawPoll[])?.filter((poll) =>
    poll.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading)
    return (
      <p className="text-center py-10 text-base sm:text-lg text-gray-600">
        Loading polls...
      </p>
    );
  if (isError)
    return (
      <p className="text-center py-10 text-base sm:text-lg text-red-500">
        Failed to fetch polls.
      </p>
    );

  return (
    <div className="w-full px-0 sm:px-6 md:px-10 lg:px-16 py-8 sm:py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 sm:mb-8 gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#9084df]">
            Active Polls
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Vote on ongoing polls or check their results
          </p>
        </div>
        <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
          <Input
            placeholder="Search polls..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 text-sm sm:text-base w-full"
          />
        </div>
      </div>
      {filteredPolls?.length === 0 ? (
        <p className="text-center py-10 text-base sm:text-lg text-gray-600">
          No polls found.
        </p>
      ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPolls?.map((poll, index) => (
            <Card
              key={index}
              className="flex flex-col justify-between bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <CardTitle className="text-base sm:text-lg md:text-xl truncate">
                  {poll.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm sm:text-base text-gray-500 space-y-2">
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  {poll.isActive ? (
                    <span className="text-green-600 font-medium bg-green-100 px-2 py-1 rounded-2xl">
                      Active
                    </span>
                  ) : (
                    <span className="text-red-600 font-medium">Expired</span>
                  )}
                </p>
                <p className="truncate">
                  <span className="font-medium">Ends:</span>{" "}
                  {format(new Date(Number(poll.expiresAt) * 1000), "PPPpp")}
                </p>
                <p>Options: {poll.optionCount.toString()} / Total Votes: {poll.votes.reduce((a, b) => Number(a) + Number(b), 0)}</p>
              </CardContent>
              <CardFooter>
                <Link href={`/polls/${index}`} className="w-full">
                  <Button
                    variant="customBlue"
                    className="w-full text-sm sm:text-base"
                  >
                    <PillIcon className="w-4 h-4 mr-2" />
                    View & Vote
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PollList;
