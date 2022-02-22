import { supabase } from "../_lib/supabase"
import type { IncomingMessage, ServerResponse } from "http"
import { useQuery } from "h3"

export default async (req: IncomingMessage, res: ServerResponse) => {
  const { name } = useQuery(req)
  if (name) {
    const { data, error } = await supabase
      .from("products")
      .select(
        "id, title, description, categories, url, github_url, twitter, instagram, images, slug, supabase_features"
      )
      .eq("slug", name)
      .single()

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
