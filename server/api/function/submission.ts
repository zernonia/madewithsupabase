import { supabase } from "../../_lib/supabase"
import type { IncomingMessage, ServerResponse } from "http"
import { useBody } from "h3"

export default async (req: IncomingMessage, res: ServerResponse) => {
  const { form } = await useBody(req)
  const simplelog_token = process.env.SIMPLELOG_TOKEN
  form.approved = false

  const { data, error } = await supabase.from("products").insert(form).single()
  if (!error) {
    await $fetch("https://simple-log.vercel.app/api/v1/log", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + simplelog_token,
      },
      body: {
        project: "simple-log",
        channel: "submission",
        event: "New Submission",
        description: `Title: ${data.title}
Description: ${data.description.substring(0, 200)}
URL: ${data.url}
GitHub url: ${data.github_url}
Twitter: ${data.twitter}`,
        icon: "✨",
        notify: true,
      },
    })
    return { success: true }
  } else {
    res.statusCode = 500
    return { error }
  }
}
