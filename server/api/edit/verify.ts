import { supabase } from "../../_lib/supabase"

export default defineEventHandler(async (event) => {
  const { email, slug } = await readBody(event)
  let verify = false

  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single()

  data.email == email ? (verify = true) : ""
  return { verify }
})
