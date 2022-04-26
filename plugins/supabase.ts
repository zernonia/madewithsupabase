import { createClient } from "@supabase/supabase-js"

export default defineNuxtPlugin(() => {
  const env = useRuntimeConfig()
  const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)

  return {
    provide: {
      supabase,
    },
  }
})
