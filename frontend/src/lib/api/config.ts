
export const getApiBaseUrl = (): string => {
  // Always check environment variable first (required for production)
  if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }

  // In browser environment
  if (typeof window !== "undefined") {
    const { hostname, protocol } = window.location;
    
    // Development: localhost automatically uses port 3000
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return `${protocol}//${hostname}:3000`;
    }
    
    // Production: require environment variable
    if (process.env.NODE_ENV === "production") {
      console.error(
        "❌ NEXT_PUBLIC_API_BASE_URL environment variable is required for production. " +
        "Please set it with your backend server URL."
      );
      // Return empty string to prevent crashes, but log error
      return "";
    }
    
    // Development fallback (not recommended, but allows local network testing)
    console.warn(
      "⚠️ NEXT_PUBLIC_API_BASE_URL is not set. " +
      "For production deployment, you must set this environment variable."
    );
    // Only use this fallback in development
    return `${protocol}//${hostname}:3000`;
  }
  
  // Server-side default (development only)
  return "http://localhost:3000";
};

// Lazy evaluation to prevent errors during build if env var is not set
let cachedApiBaseUrl: string | null = null;

export const getAPIBaseURL = (): string => {
  if (cachedApiBaseUrl === null) {
    cachedApiBaseUrl = getApiBaseUrl();
  }
  return cachedApiBaseUrl;
};

// For backward compatibility, but prefer using getAPIBaseURL()
export const API_BASE_URL = getAPIBaseURL();
