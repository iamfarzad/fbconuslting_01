import { ChatLoading } from "@/components/chat/ChatLoading";

export default function ChatLoadingPage() {
  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <div className="h-12 bg-muted rounded w-2/3 mx-auto animate-pulse" />
          <div className="h-6 bg-muted rounded w-1/2 mx-auto animate-pulse" />
        </div>
        <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto bg-background rounded-lg shadow-lg">
          <ChatLoading />
        </div>
      </div>
    </div>
  );
}
