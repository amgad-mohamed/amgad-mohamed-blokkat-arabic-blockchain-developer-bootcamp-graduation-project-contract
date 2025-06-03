// hooks/useTransactionHandler.ts
import { useState } from "react";
import toast from "react-hot-toast";

export const useTransactionHandler = () => {
  const [hasErrorToastShown, setHasErrorToastShown] = useState(false);

  const handleError = (err: unknown) => {
    if (hasErrorToastShown) return;

    setHasErrorToastShown(true);

    const message =
      err instanceof Error
        ? "shortMessage" in err
          ? (err as { shortMessage: string }).shortMessage
          : err.message
        : "An unknown error occurred.";

    toast.error(`Transaction failed: ${message}`);
  };

  const resetErrorToast = () => setHasErrorToastShown(false);

  return { handleError, resetErrorToast };
};
