import React from 'react';
import { useChat } from '@/providers/chat/ChatProvider'; // Import the unified hook

export default function ChooseAction() {
  const { setStep } = useChat(); // Use the unified hook

  return (
    <div className="max-w-md mx-auto text-center space-y-6">
      <h2 className="text-xl font-bold">How would you like to proceed?</h2>
      <p className="text-muted-foreground text-sm">
        We can send you a personalized proposal, or you can talk with Farzad directly in a 15-minute call.
      </p>

      <div className="space-y-4">
        <button
          onClick={() => setStep('form')}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-900"
        >
          📩 Get a Proposal
        </button>
        <button
          onClick={() => window.open('https://calendly.com/your-link', '_blank')}
          className="w-full border border-black text-black py-2 rounded hover:bg-gray-100"
        >
          📞 Book a 15-minute Call
        </button>
      </div>
    </div>
  );
}
