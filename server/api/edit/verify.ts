import { useSupabaseServer } from "~~/composables/supabase-server"

export default defineEventHandler(async (event) => {
  const { email, slug } = await readBody(event)
  const client = useSupabaseServer(event)
  let verify = false

  const { data } = await client
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single()

  data?.email == email ? (verify = true) : ""
  return { verify }
})
