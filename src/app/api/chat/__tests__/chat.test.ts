import { NextRequest } from 'next/server';
import { POST as chatHandler } from '../route';
import { POST as streamingHandler } from '../streaming/route';
import { mockChatResponse, mockStreamingResponse, mockErrorResponse } from '@/services/__mocks__/chat';

// Extend NextRequest mock with required properties
declare global {
  var NextRequest: typeof Request & {
    prototype: Request & {
      nextUrl: URL;
      geo: Record<string, any>;
      ip: string;
      cookies: Map<string, string>;
    };
  };
}

// Mock fetch
global.fetch = jest.fn();

describe('Chat API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.GEMINI_API_KEY = 'test-api-key';
  });

  describe('Regular Chat Endpoint', () => {
    it('should handle successful chat requests', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockChatResponse)
      });

      const req = new NextRequest('http://localhost:3000/api/chat', {
        method: 'POST',
        body: JSON.stringify({
          message: 'Hello',
          history: []
        })
      });

      const response = await chatHandler(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.message).toBe(mockChatResponse.candidates[0].content.parts[0].text);
    });

    it('should handle missing API key', async () => {
      delete process.env.GEMINI_API_KEY;

      const req = new NextRequest('http://localhost:3000/api/chat', {
        method: 'POST',
        body: JSON.stringify({
          message: 'Hello',
          history: []
        })
      });

      const response = await chatHandler(req);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Missing GEMINI_API_KEY environment variable');
    });

    it('should handle API errors', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        text: () => Promise.resolve(JSON.stringify(mockErrorResponse))
      });

      const req = new NextRequest('http://localhost:3000/api/chat', {
        method: 'POST',
        body: JSON.stringify({
          message: 'Hello',
          history: []
        })
      });

      const response = await chatHandler(req);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Error processing your request');
    });
  });

  describe('Streaming Chat Endpoint', () => {
    it('should handle successful streaming requests', async () => {
      const encoder = new TextEncoder();
      const mockReadableStream = new ReadableStream({
        start(controller) {
          mockStreamingResponse.forEach(chunk => {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
          });
          controller.close();
        }
      });

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        body: mockReadableStream
      });

      const req = new NextRequest('http://localhost:3000/api/chat/streaming', {
        method: 'POST',
        body: JSON.stringify({
          message: 'Hello',
          history: []
        })
      });

      const response = await streamingHandler(req);
      expect(response.status).toBe(200);
      expect(response.headers.get('content-type')).toBe('text/event-stream');
    });

    it('should handle streaming errors', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Stream error'));

      const req = new NextRequest('http://localhost:3000/api/chat/streaming', {
        method: 'POST',
        body: JSON.stringify({
          message: 'Hello',
          history: []
        })
      });

      const response = await streamingHandler(req);
      const data = await response.json();

      expect(data.error).toBe('Error processing your request');
    });
  });
});
