import marked from "marked"
import type { ProductData } from "~~/script/interface"

type InsertPayload = {
  type: "INSERT"
  table: string
  schema: string
  record: any
  old_record: null
}
export default defineEventHandler(async (event) => {
  const cfg = useRuntimeConfig()
  const discord_webhook_url = cfg.public.DISCORD_WEBHOOK_URL
  const payload = (await readBody(event)) as InsertPayload

  if (payload.type === "INSERT") {
    const data = payload.record as ProductData
    const response = await $fetch(discord_webhook_url, {
      method: "POST",
      body: {
        content: `**New submission** 
  title: ${data.title}
  description: ${marked(data.description ?? "")}
  url: ${data.url}
  github url: ${data.github_url}
  twitter: ${data.twitter}
      `,
      },
    })

    return response
  } else {
    return undefined
  }
})
