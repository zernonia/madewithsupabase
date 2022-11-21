import { useSupabaseServer } from "~~/composables/supabase"

export default defineEventHandler(async (event) => {
  const { form } = await readBody(event)
  const client = useSupabaseServer()

  const { data, error } = await client.from("products").upsert(form).single()
  return { data, error }
})
