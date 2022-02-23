import { supabase } from "../_lib/supabase"
import type { IncomingMessage, ServerResponse } from "http"
import { useQuery, sendRedirect, sendError } from "h3"

export default async (req: IncomingMessage, res: ServerResponse) => {
  const { name } = useQuery(req)
  if (name) {
    const initialData = await supabase
      .from("products")
      .select("*")
      .eq("slug", name)
      .single()
    if (!initialData.error) {
      const redirect_url = initialData.data.url + "?ref=madewithsupabase"
      res.writeHead(302, {
        Location: redirect_url,
      })
      res.end()
    } else {
      res.statusCode = 500
      res.end("No project found")
    }
  } else {
    res.statusCode = 500
    res.end("No project found")
  }
}
