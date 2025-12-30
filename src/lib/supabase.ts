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

// Export a flag to check if Supabase is truly connected
// We check if the URL exists, is valid, and is NOT the placeholder text we use in the .env template
export const isSupabaseConnected = supabaseUrl && isValidUrl(supabaseUrl) && !supabaseUrl.includes('placeholder') && !supabaseUrl.includes('YOUR_API_KEY');

// Determine the URL to use. If the env var is missing or is the placeholder,
// fallback to a syntactically valid URL to prevent the app from crashing on startup.
const urlToUse = isSupabaseConnected
  ? supabaseUrl 
  : 'https://placeholder.supabase.co';

const keyToUse = (supabaseAnonKey && supabaseAnonKey !== 'YOUR_API_KEY')
  ? supabaseAnonKey
  : 'placeholder-key';

export const supabase = createClient(urlToUse, keyToUse);
