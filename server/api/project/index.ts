import { useSupabaseServer } from "~~/composables/supabase-server"

export default defineEventHandler(async (event) => {
  const client = useSupabaseServer(event)
  const { req, res } = event.node
  let name: any
  if (req.method == "GET") {
    ;({ name } = getQuery(event))
  } else if (req.method == "POST") {
    ;({ name } = await readBody(event))
  }

  if (name) {
    const { data, error } = await client
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
