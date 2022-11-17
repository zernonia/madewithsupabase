import { supabase } from "../../_lib/supabase"

export default defineEventHandler(async (event) => {
  const { form } = await readBody(event)
  const { data, error } = await supabase.from("products").upsert(form).single()
  return { data, error }
})
