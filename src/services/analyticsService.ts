export const trackEvent = (eventOrProps: string | Record<string, any>, properties?: Record<string, any>) => {
  // Implementation supports both string event name or object with properties
  if (typeof eventOrProps === 'string') {
    // Original implementation for string event names
    console.log(`[Analytics] ${eventOrProps}`, properties);
    
    // Send to Google Analytics if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventOrProps, properties);
    }
  } else {
    // Object-based implementation
    console.log('[Analytics] Event:', eventOrProps);
    
    // Send to Google Analytics if available
    if (typeof window !== 'undefined' && window.gtag) {
      // Extract action or use 'event'
      const action = eventOrProps.action || 'event';
      const { action: _, ...restProps } = eventOrProps;
      window.gtag('event', action, restProps);
    }
  }
};

export const trackSearch = (query: string) => {
  // Implement search tracking
  console.log(`Search tracked: ${query}`);
  trackEvent('search', { query });
};

declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: any) => void;
  }
}
