import { ChatInterface } from "@/components/chat/ChatInterface";

export const metadata = {
  title: "AI Chat | Farzad Bayat",
  description: "Chat with Farzad's AI assistant about AI consulting, automation, and digital transformation.",
};

export default function ChatPage() {
  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">
            Chat with Farzad&apos;s AI Assistant
          </h1>
          <p className="text-muted-foreground text-center max-w-[600px] mx-auto">
            Get instant answers about AI consulting, automation strategies, and digital transformation. Available 24/7 to help you explore how AI can benefit your business.
          </p>
        </div>
        <ChatInterface />
      </div>
    </div>
  );
}
