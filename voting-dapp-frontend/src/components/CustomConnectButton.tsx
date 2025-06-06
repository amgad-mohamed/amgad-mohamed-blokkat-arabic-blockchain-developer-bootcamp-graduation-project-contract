import React from "react";
import { useAppKit } from "@reown/appkit/react";
import { useAccount } from "wagmi";
import { Button } from "@/shared/Button";

// Custom button component
const CustomConnectButton: React.FC = () => {
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();

  const handleConnect = async () => {
    try {
      await open();
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  const handleDisconnect = () => {
    open({ view: "Account" });
  };

  return (
    <div className="flex items-center w-full">
      {isConnected ? (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
          <Button onClick={handleDisconnect} variant="destructive" size="sm">
            Disconnect
          </Button>
        </div>
      ) : (
        <Button
          onClick={handleConnect}
          variant="customBlue"
          size="sm"
          className="w-full sm:w-auto text-sm sm:text-base"
        >
          Connect Wallet
        </Button>
      )}
    </div>
  );
};

export default CustomConnectButton;
