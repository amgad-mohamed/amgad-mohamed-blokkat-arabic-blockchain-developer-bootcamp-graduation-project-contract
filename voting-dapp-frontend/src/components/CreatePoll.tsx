"use client";

import * as React from "react";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../app/lib/contract";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/shared/card";
import { TrashIcon, PlusIcon } from "lucide-react";
import { Button } from "@/shared/Button";
import { Input } from "@/shared/input";
import { cn } from "@/app/lib/utils";

const formSchema = z.object({
  pollName: z.string().min(5, "Poll name must be at least 5 characters"),
  duration: z
    .number({ invalid_type_error: "Duration must be a number" })
    .min(1, "Duration must be at least 1 hour"),
  options: z
    .array(z.object({ text: z.string().min(1, "Option text is required") }))
    .min(2, "At least 2 options are required"),
});

type FormValues = z.infer<typeof formSchema>;

export function CreatePoll() {
  const router = useRouter();

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

  const [loading, setLoading] = React.useState(false);
  const [hasErrorToastShown, setHasErrorToastShown] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pollName: "",
      duration: 10,
      options: [{ text: "" }, { text: "" }],
    },
  });

  const { control, handleSubmit, reset } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const handleTransactionError = (err: unknown) => {
    if (hasErrorToastShown) return;
    setHasErrorToastShown(true);

    if (err instanceof Error) {
      const msg =
        "shortMessage" in err
          ? (err as { shortMessage: string }).shortMessage
          : err.message;
      toast.error(`Transaction failed: ${msg}`);
    } else {
      toast.error("An unknown error occurred.");
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      setHasErrorToastShown(false);

      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "createPoll",
        args: [
          data.pollName,
          data.options.map((opt) => opt.text),
          data.duration * 60 * 60,
        ],
      });
    } catch (err) {
      setLoading(false);
      toast.dismiss("tx-status");
      handleTransactionError(err);
    }
  };

  React.useEffect(() => {
    if (isConfirming) {
      toast.loading("Transaction pending...", { id: "tx-status" });
    }
  }, [isConfirming]);

  React.useEffect(() => {
    if (isConfirmed) {
      toast.success("Poll created successfully!", { id: "tx-status" });
      reset();
      setLoading(false);
    }
  }, [isConfirmed]);

  React.useEffect(() => {
    if (isWriteError && writeError) {
      setLoading(false);
      toast.dismiss("tx-status");
      handleTransactionError(writeError);
    }
  }, [isWriteError, writeError]);

  React.useEffect(() => {
    if (isReceiptError && receiptError) {
      setLoading(false);
      toast.dismiss("tx-status");
      handleTransactionError(receiptError);
    }
  }, [isReceiptError, receiptError]);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="w-full max-w-2xl mx-auto">
        <Card className="shadow-md bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl font-semibold">
              Create a New Poll
            </CardTitle>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <FormField
                  control={control}
                  name="pollName"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Poll Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter poll name"
                          className={cn(
                            "w-full text-sm sm:text-base ",
                            fieldState.error && "border-red-500"
                          )}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600  font-normal" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="duration"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Duration (in hours)</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          min={1}
                          {...field}
                          placeholder="e.g. 1"
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d*$/.test(value)) {
                              field.onChange(value === "" ? "" : Number(value));
                            } else {
                              form.setError("duration", {
                                type: "manual",
                                message: "Only numbers are allowed",
                              });
                            }
                          }}
                          onBlur={(e) => {
                            // Clear error on blur if value is valid
                            if (/^\d+$/.test(e.target.value)) {
                              form.clearErrors("duration");
                            }
                            field.onBlur();
                          }}
                          className={cn(
                            "w-full text-sm sm:text-base  ",
                            fieldState.error && "border-red-500 "
                          )}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600  font-normal" />
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel>Poll Options</FormLabel>
                  <div className="space-y-3 mt-2 max-h-[300px] overflow-y-auto">
                    {fields.map((field, index) => (
                      <FormField
                        key={field.id}
                        control={control}
                        name={`options.${index}.text`}
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <div className="flex gap-2 items-center">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder={`Option ${index + 1}`}
                                  className={cn(
                                    "w-full text-sm sm:text-base  ",
                                    fieldState.error && "border-red-500"
                                  )}
                                />
                              </FormControl>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => remove(index)}
                                disabled={fields.length <= 2}
                              >
                                <TrashIcon className="h-5 w-5 text-gray-500" />
                              </Button>
                            </div>
                            <FormMessage className="text-red-600  font-normal" />
                          </FormItem>
                        )}
                      />
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => append({ text: "" })}
                      className="w-full sm:w-auto text-sm mt-2"
                    >
                      <PlusIcon className="mr-2 h-4 w-4" />
                      Add Option
                    </Button>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col sm:flex-row justify-end gap-3">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    reset();
                    router.push("/");
                  }}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  variant="customBlue"
                  type="submit"
                  disabled={loading || isConfirming}
                  className="w-full sm:w-auto"
                >
                  {loading || isConfirming ? "Creating..." : "Create Poll"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
