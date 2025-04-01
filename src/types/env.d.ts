declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_GEMINI_API_KEY: string;
    NEXT_PUBLIC_GA_TRACKING_ID: string;
    NEXT_PUBLIC_WS_BASE_URL: string;
    NEXT_PUBLIC_API_URL: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}
