import { defineNuxtPlugin, useRuntimeConfig } from "#app"
import { createClient } from "@supabase/supabase-js"

export default defineNuxtPlugin((nuxtApp) => {
  const env = useRuntimeConfig()
  const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)

  nuxtApp.provide("supabase", supabase)
  nuxtApp.vueApp.provide("supabase", supabase)
})
