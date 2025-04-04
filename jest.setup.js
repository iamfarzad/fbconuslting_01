// Ensure Jest DOM matchers are available
import '@testing-library/jest-dom'; 
require('@testing-library/jest-dom'); // Use require for Jest setup as well, just in case

// Mock global fetch
global.fetch = jest.fn();

// Mock Request, Response and Headers which aren't available in Node environment
// Mock Request, Response and Headers which aren't available in Node environment
// Use a simple object structure for the mock Request to avoid getter/setter issues
global.Request = jest.fn((input, init = {}) => ({
  url: typeof input === 'string' ? input : input?.url,
  method: init.method || 'GET',
  headers: new Headers(init.headers || {}),
  body: init.body,
  // Add clone method if needed by tests
  clone: jest.fn(() => ({ ...this })),
}));

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
// Ensure the mock adheres to the expected structure and avoids getter issues
global.NextRequest = jest.fn((input, init = {}) => {
  const baseRequest = global.Request(input, init); // Use the mocked Request
  return {
    ...baseRequest,
    nextUrl: new URL(typeof input === 'string' ? input : input?.url || 'http://localhost'), // Provide a default URL if needed
    headers: baseRequest.headers, // Ensure headers are correctly passed
    // Add other properties/methods if needed by tests
    cookies: { // Add a basic cookies mock if needed
      get: jest.fn(),
      set: jest.fn(),
      has: jest.fn(),
      delete: jest.fn(),
      clear: jest.fn(),
      getAll: jest.fn(() => []),
    },
  };
});

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

// Add TextEncoder/TextDecoder mocks for Node environment
const util = require('util');
global.TextEncoder = util.TextEncoder;
global.TextDecoder = util.TextDecoder;

// Add a basic ReadableStream mock for Node environment
global.ReadableStream = class ReadableStream {
  constructor(underlyingSource = {}, strategy = {}) {
    // Basic mock implementation - expand if tests need more functionality
    this._controller = null;
    this._started = false;
    this._closed = false;
    this._storedError = null;

    if (underlyingSource.start) {
      try {
        // Mock controller with basic enqueue/close/error
        this._controller = {
          enqueue: jest.fn(),
          close: jest.fn(() => { this._closed = true; }),
          error: jest.fn((e) => { this._storedError = e; this._closed = true; }),
        };
        underlyingSource.start(this._controller);
        this._started = true;
      } catch (e) {
        this._storedError = e;
        this._closed = true;
      }
    }
  }

  get locked() {
    return false; // Simple mock
  }

  cancel(reason) {
    return Promise.resolve(); // Simple mock
  }

  getReader() {
    // Return a mock reader if needed by tests
    return {
      read: jest.fn().mockResolvedValue({ done: true, value: undefined }),
      releaseLock: jest.fn(),
      closed: Promise.resolve(undefined), // Simple mock
      cancel: jest.fn().mockResolvedValue(undefined),
    };
  }

  pipeTo(dest, options) {
    return Promise.resolve(); // Simple mock
  }

  pipeThrough(transform, options) {
    return this; // Simple mock
  }

  tee() {
    return [this, this]; // Simple mock
  }
};


// Add any other global mocks your tests need here
