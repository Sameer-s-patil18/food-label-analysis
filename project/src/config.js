// Get the current URL
const currentUrl = window.location.origin;

// Use the current URL for API calls in production
export const API_BASE_URL = import.meta.env.VITE_API_URL || currentUrl || 'http://localhost:5000'; 