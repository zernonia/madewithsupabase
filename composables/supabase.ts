import { createClient } from '@supabase/supabase-js'
import type { Database } from '~~/types'

export function useSupabase() {
  const cfg = useRuntimeConfig()
  return createClient<Database>(
    cfg.public.SUPABASE_URL,
    cfg.public.SUPABASE_KEY,
  )
}

export function useSupabaseServer() {
  return createClient<Database>(
    process.env.SUPABASE_URL ?? '',
    process.env.SUPABASE_SERVICE_KEY ?? '',
  )
}
