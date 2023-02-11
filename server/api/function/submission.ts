import { useSupabaseServer } from "~~/composables/supabase"

export default defineEventHandler(async (event) => {
  const { form } = await readBody(event)
  const client = useSupabaseServer()
  const simplelog_token = process.env.SIMPLELOG_TOKEN
  form.approved = false

  const { data, error } = await client
    .from("products")
    .upsert(form)
    .select()
    .single()
  if (!error && data) {
    $fetch("https://simple-log.vercel.app/api/v1/log", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + simplelog_token,
      },
      body: {
        project: "simple-log",
        channel: "submission",
        event: "New Submission",
        description: `Title: ${data.title}
Description: ${data.description?.substring(0, 200)}
URL: ${data.url}
GitHub url: ${data.github_url}
Twitter: ${data.twitter}`,
        icon: "✨",
        notify: true,
      },
    })
    return { success: true }
  } else {
    event.res.statusCode = 500
    return { error }
  }
})
