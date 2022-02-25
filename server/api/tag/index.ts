import { supabase } from "../../_lib/supabase"
import type { IncomingMessage, ServerResponse } from "http"
import { useQuery } from "h3"

export default async (req: IncomingMessage, res: ServerResponse) => {
  let { name } = useQuery(req)
  let rpc = "get_tags"
  if (name.toString().toLowerCase().startsWith("supabase")) {
    rpc = "get_supabase_tags"
  }
  if (name) {
    const { data, error } = await supabase
      .rpc(rpc, { tag: name }, { count: "exact" })
      .order("views", { ascending: false })

    if (data) {
      return data
    } else {
      res.statusCode = 500
      return error
    }
  }
  res.statusCode = 500
  return "error"
}
