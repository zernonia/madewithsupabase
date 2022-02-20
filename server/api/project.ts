import { supabase } from "../_lib/supabase"
import type { IncomingMessage, ServerResponse } from "http"
import { useBody } from "h3"

export default async (req: IncomingMessage, res: ServerResponse) => {
  const { slug } = await useBody(req)

  if (slug) {
    const { data, error } = await supabase
      .from("products")
      .select(
        "id, title, description, categories, url, github_url, twitter, instagram, images, slug, supabase_features"
      )
      .eq("slug", slug)
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
