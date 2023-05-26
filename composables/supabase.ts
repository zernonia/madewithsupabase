import type { Database } from "~~/types"
import { createClient } from "@supabase/supabase-js"

export const useSupabase = () => {
  const cfg = useRuntimeConfig()
  return createClient<Database>(
    cfg.public.SUPABASE_URL,
    cfg.public.SUPABASE_KEY
  )
}

export const useSupabaseServer = () => {
  return createClient<Database>(
    process.env.SUPABASE_URL ?? "",
    process.env.SUPABASE_SERVICE_KEY ?? ""
  )
}
