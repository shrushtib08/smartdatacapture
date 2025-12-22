// Utility for handling local storage data
export interface Capture {
  id: string;
  type: 'image' | 'voice';
  content: string;
  timestamp: string;
  preview_url?: string;
}

const STORAGE_KEY = 'smart_capture_history';
const AUTH_KEY = 'smart_capture_auth';

export const saveCapture = (capture: Omit<Capture, 'id' | 'timestamp'>) => {
  const history = getHistory();
  const newCapture: Capture = {
    ...capture,
    id: Date.now().toString(), // Simple ID generation
    timestamp: new Date().toISOString(),
  };
  
  // Limit history to last 20 items to prevent infinite growth
  const limitedHistory = [newCapture, ...history].slice(0, 20);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedHistory));
  } catch (e: any) {
    // Handle QuotaExceededError by removing large image data
    if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
      console.warn("Storage quota exceeded. Attempting to save without image preview.");

      // Retry without the image preview
      const captureNoImage = { ...newCapture, preview_url: undefined };
      const retryHistory = [captureNoImage, ...history].slice(0, 20);
      
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(retryHistory));
        return captureNoImage;
      } catch (retryError) {
        console.warn("Storage still full. Clearing all image previews to make space.");
        
        // If still failing, strip images from ALL history items to make space
        const textOnlyHistory = retryHistory.map(item => ({ ...item, preview_url: undefined }));
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(textOnlyHistory));
        } catch (finalError) {
            console.error("Critical storage error: Unable to save data even after cleanup.");
        }
        return captureNoImage;
      }
    }
    // If it's another error, log it but don't crash
    console.error("Storage error:", e);
  }
  return newCapture;
};

export const getHistory = (): Capture[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Failed to parse history", e);
    return [];
  }
};

export const clearHistory = () => {
  localStorage.removeItem(STORAGE_KEY);
};

// Simple Auth Simulation
export const loginUser = (email: string) => {
  localStorage.setItem(AUTH_KEY, JSON.stringify({ email, isLoggedIn: true }));
};

export const logoutUser = () => {
  localStorage.removeItem(AUTH_KEY);
};

export const isAuthenticated = () => {
  return !!localStorage.getItem(AUTH_KEY);
};

export const getCurrentUser = () => {
    try {
        const stored = localStorage.getItem(AUTH_KEY);
        return stored ? JSON.parse(stored) : null;
    } catch (e) {
        return null;
    }
};
