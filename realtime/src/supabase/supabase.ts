import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

// row level security is enabled, so there is no problem with the following keys being public
const supaUrl = 'https://wjnsyfqtncpamwsqffag.supabase.co'
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqbnN5ZnF0bmNwYW13c3FmZmFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk3NzM2MTQsImV4cCI6MTk2NTM0OTYxNH0.RTlShkFb1vuzeWVMEqjRmlNBgRzQxnP04cI9GvQf1pY'

export const supabase = createClient(supaUrl, anonKey, {
  localStorage: AsyncStorage,
  detectSessionInUrl: false
})
