import { useSupabaseServer } from "~~/composables/supabase-server"

export default defineEventHandler(async (event) => {
  const { form } = await readBody(event)
  const client = useSupabaseServer(event)

  const { data, error } = await client.from("products").upsert(form).single()
  return { data, error }
})
