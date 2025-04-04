
import { useState, useMemo } from 'react';
import { GeminiAdapter } from '@/features/gemini/services/geminiAdapter';

export function HeroChat() {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const adapter = useMemo(() => {
    if (!apiKey) {
      console.error('Gemini API key is missing.');
      return null;
    }
    return new GeminiAdapter(apiKey);
  }, [apiKey]);

  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    if (!adapter) {
      setResponse('Configuration error: Cannot connect to the chat service.');
      return;
    }

    setIsLoading(true);
    try {
      // Note: The original code passed an object { prompt: message },
      // but the adapter expects just the prompt string. Adjusting the call.
      const resultText = await adapter.generateResponse(message);
      setResponse(resultText); // Assuming the adapter returns the text directly
      setMessage('');
    } catch (error) {
      console.error('Chat error:', error);
      setResponse('Sorry, there was an error processing your request.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="min-h-[200px] mb-4">
          {response && (
            <div className="prose">
              <p>{response}</p>
            </div>
          )}
          {isLoading && (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading || !message.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
