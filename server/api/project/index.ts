import { supabase } from "../../_lib/supabase"

export default defineEventHandler(async (event) => {
  const { req, res } = event.node
  let name: any
  if (req.method == "GET") {
    ;({ name } = getQuery(event))
  } else if (req.method == "POST") {
    ;({ name } = await readBody(event))
  }

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
})
