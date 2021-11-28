import { supabase } from "../../_lib/supabase"
import type { IncomingMessage, ServerResponse } from "http"
import { useBody } from "h3"

export default async (req: IncomingMessage, res: ServerResponse) => {
  const { form } = await useBody(req)
  form.approved = false

  const { data, error } = await supabase.from("products").insert(form)
  if (!error) {
    return { success: true }
  } else {
    res.statusCode = 404
    return { error }
  }
}
