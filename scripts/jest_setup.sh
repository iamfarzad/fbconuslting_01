#!/bin/bash

echo "🔧 Fixing Jest setup..."

# Create or update jest.setup.js to fix the Request not defined error
cat > jest.setup.js << 'EOL'
import '@testing-library/jest-dom';

// Mock global fetch
global.fetch = jest.fn();

// Mock Request, Response and Headers which aren't available in Node environment
global.Request = class Request {
  constructor(input, init = {}) {
    this.url = input;
    this.method = init.method || 'GET';
    this.headers = new Headers(init.headers || {});
    this.body = init.body;
  }
};

global.Response = class Response {
  constructor(body, init = {}) {
    this.body = body;
    this.status = init.status || 200;
    this.statusText = init.statusText || '';
    this.headers = new Headers(init.headers || {});
    this._bodyText = typeof body === 'string' ? body : JSON.stringify(body);
  }
  
  json() {
    return Promise.resolve(JSON.parse(this._bodyText));
  }
  
  text() {
    return Promise.resolve(this._bodyText);
  }
};

global.Headers = class Headers {
  constructor(init = {}) {
    this._headers = {};
    if (init) {
      Object.keys(init).forEach(key => {
        this._headers[key.toLowerCase()] = init[key];
      });
    }
  }
  
  append(name, value) {
    this._headers[name.toLowerCase()] = value;
  }
  
  get(name) {
    return this._headers[name.toLowerCase()] || null;
  }
};

class URL {
  constructor(url) {
    this.href = url;
    // Parse out components as needed
    const urlParts = url.split('?');
    this.pathname = urlParts[0];
    this.searchParams = new URLSearchParams(urlParts[1] || '');
  }
}

global.URL = URL;

// Mock NextRequest and NextResponse if tests are using them
global.NextRequest = class NextRequest extends global.Request {
  constructor(input, init = {}) {
    super(input, init);
    this.nextUrl = new URL(typeof input === 'string' ? input : input.url);
  }
};

global.NextResponse = {
  json: (body, init) => {
    return new Response(JSON.stringify(body), {
      ...init,
      headers: {
        ...init?.headers,
        'content-type': 'application/json',
      },
    });
  },
  redirect: (url) => {
    return new Response(null, {
      status: 302,
      headers: {
        location: url,
      },
    });
  },
};

// Add any other global mocks your tests need here
EOL

# Update jest.config.js to ensure it uses the setup file
cat > jest.config.js << 'EOL'
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
EOL

echo "✅ Jest setup fixed"