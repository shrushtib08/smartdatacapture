import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Helper to check if a string is a valid URL
const isValidUrl = (urlString: string) => {
  try { 
    return Boolean(new URL(urlString)); 
  }
  catch(e){ 
    return false; 
  }
}

// Determine the URL to use. If the env var is missing or is the placeholder "YOUR_API_KEY",
// fallback to a syntactically valid URL to prevent the app from crashing on startup.
const urlToUse = (supabaseUrl && isValidUrl(supabaseUrl)) 
  ? supabaseUrl 
  : 'https://placeholder.supabase.co';

const keyToUse = (supabaseAnonKey && supabaseAnonKey !== 'YOUR_API_KEY')
  ? supabaseAnonKey
  : 'placeholder-key';

export const supabase = createClient(urlToUse, keyToUse);
