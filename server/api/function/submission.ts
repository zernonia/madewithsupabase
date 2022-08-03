import { supabase } from "../../_lib/supabase"
import type { IncomingMessage, ServerResponse } from "http"
import { useBody } from "h3"
import marked from "marked"

export default async (req: IncomingMessage, res: ServerResponse) => {
  const { form } = await useBody(req)
  const cfg = useRuntimeConfig()
  const discord_webhook_url = cfg.public.DISCORD_WEBHOOK_URL
  form.approved = false

  const { data, error } = await supabase.from("products").insert(form).single()
  if (!error) {
    await $fetch(discord_webhook_url, {
      method: "POST",
      body: {
        content: `**New submission** 
  Title: ${data.title}
  Description: ${data.description}
  URL: ${data.url}
  GitHub url: ${data.github_url}
  Twitter: ${data.twitter}
      `,
      },
    })
    return { success: true }
  } else {
    res.statusCode = 500
    return { error }
  }
}
