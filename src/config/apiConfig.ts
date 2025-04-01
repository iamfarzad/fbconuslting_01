const API_CONFIG = {
  gemini: {
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '',
    baseUrl: 'https://generativelanguage.googleapis.com',
    version: 'v1',
    model: 'gemini-pro',
  },
  openai: {
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
    model: 'gpt-3.5-turbo',
  },
  WS_BASE_URL: process.env.NEXT_PUBLIC_WS_BASE_URL || 'wss://api.fbconsulting.com/ws',
  WEBSOCKET: {
    RECONNECT_DELAY: 1000,
    MAX_RECONNECT_ATTEMPTS: 5,
    PATH: '/chat/'
  },
  DEFAULT_PING_INTERVAL: 30000,
  DEFAULT_RECONNECT_ATTEMPTS: 5,
};

export default API_CONFIG;
