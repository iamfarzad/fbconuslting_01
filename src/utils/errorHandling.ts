export const formatErrorMessage = (error: any): string => {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  return JSON.stringify(error);
};

export const logDetailedError = (context: string, error: any) => {
  console.error(`Error in ${context}:`, error);
  if (error instanceof Error && error.stack) {
    console.error('Stack trace:', error.stack);
  }
};

export enum ErrorCategory {
  NETWORK = 'network',
  AUTHENTICATION = 'auth',
  PERMISSION = 'permission',
  VALIDATION = 'validation',
  SERVER = 'server',
  CLIENT = 'client',
  UNKNOWN = 'unknown'
}

export const categorizeError = (error: any): ErrorCategory => {
  if (typeof error === 'string') {
    if (error.includes('network') || error.includes('connect')) return ErrorCategory.NETWORK;
    if (error.includes('auth') || error.includes('token')) return ErrorCategory.AUTHENTICATION;
    if (error.includes('permission') || error.includes('access')) return ErrorCategory.PERMISSION;
    if (error.includes('valid') || error.includes('required')) return ErrorCategory.VALIDATION;
    if (error.includes('server')) return ErrorCategory.SERVER;
  }
  
  if (error instanceof Error) {
    if (error.name === 'NetworkError') return ErrorCategory.NETWORK;
    if (error.name === 'AuthenticationError') return ErrorCategory.AUTHENTICATION;
    // Add more conditions as needed
  }
  
  return ErrorCategory.UNKNOWN;
};
