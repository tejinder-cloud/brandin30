import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// The project address and publishable key come from the environment (set in Vercel).
// They are the browser-safe pair; what a visitor can do with them is decided in the database.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_KEY

let client: SupabaseClient | null = null

export function db(): SupabaseClient {
  if (!client) {
    if (!url || !key) throw new Error('The database is not connected yet: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_KEY.')
    client = createClient(url, key)
  }
  return client
}
