import { supabase } from "../../_lib/supabase"
import type { IncomingMessage, ServerResponse } from "http"
import { useBody } from "h3"

export default async (req: IncomingMessage, res: ServerResponse) => {
  const { email, slug } = await useBody(req)
  let verify = false

  const { data } = await supabase.from("products").select("*").eq("slug", slug).single()

  data.email == email ? (verify = true) : ""
  return { verify }
}
