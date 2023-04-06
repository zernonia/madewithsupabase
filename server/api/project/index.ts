import { useSupabaseServer } from "~~/composables/supabase"

export default defineEventHandler(async (event) => {
  const client = useSupabaseServer()
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
        "id, title, description, categories, url, github_url, twitter, instagram, images, slug, supabase_features, team_info"
      )
      .eq("slug", name)
      .single()

    if (data) {
      return data
    } else {
      return sendError(event, new Error(error.message))
    }
  }
  return sendError(event, new Error("No query.name is found"))
})
