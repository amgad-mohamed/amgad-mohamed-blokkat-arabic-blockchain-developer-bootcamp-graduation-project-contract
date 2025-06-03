export interface PollView {
  name: string;
  optionCount: bigint;
  optionNames: string[];
  votes: bigint[];
  expiresAt: bigint;
  isActive: boolean;
}
