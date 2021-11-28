import { supabase } from "../../_lib/supabase"
import type { IncomingMessage, ServerResponse } from "http"
import { useBody, useQuery } from "h3"

export default async (req: IncomingMessage, res: ServerResponse) => {
  const { form } = await useBody(req)

  const { data, error } = await supabase.from("products").upsert(form).single()

  return { data, error }
}
