import type { Database } from "~~/database.types"
import { createClient } from "@supabase/supabase-js"

export const useSupabase = () => {
  const cfg = useRuntimeConfig()
  return createClient<Database>(
    cfg.public.SUPABASE_URL,
    cfg.public.SUPABASE_KEY
  )
}

export const useSupabaseServer = () => {
  const cfg = useRuntimeConfig()
  return createClient<Database>(
    cfg.public.SUPABASE_URL,
    cfg.SUPABASE_SERVICE_KEY
  )
}
