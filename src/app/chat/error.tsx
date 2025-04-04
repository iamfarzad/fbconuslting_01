"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export default function ChatError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Chat Error:", error);
  }, [error]);

  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center h-[600px] bg-background rounded-lg shadow-lg p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold text-destructive">
            Oops! Something went wrong
          </h2>
          <p className="text-muted-foreground max-w-md">
            We encountered an error while loading the chat. Please try again or contact
            support if the problem persists.
          </p>
          <div className="flex gap-4">
            <Button onClick={() => reset()} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try again
            </Button>
            <Button asChild>
              <a href="/contact">Contact Support</a>
            </Button>
          </div>
          <div className="mt-4 p-4 bg-destructive/10 rounded text-sm text-destructive">
            {error.message || "An unexpected error occurred"}
          </div>
        </div>
      </div>
    </div>
  );
}
