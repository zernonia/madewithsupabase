import { useSupabaseServer } from "~~/composables/supabase"

let cache: any = {}
export default defineEventHandler(async (event) => {
  const client = useSupabaseServer()
  const slug = event.context.params?.slug
  const { res, req } = event

  const ip = req.headers["x-forwarded-for"] || "::1"

  if (!cache[slug as string]) {
    cache[slug as string] = []
  }

  if (slug) {
    const initialData = await client
      .from("products")
      .select("*")
      .eq("slug", slug)
      .single()
    if (!initialData.error) {
      if (cache[slug as string].findIndex((i: any) => i == ip) > -1) {
        res.end("cache")
      } else {
        await client.from("views").insert({
          ip_address: ip.toString(),
          product_id: initialData.data.id,
        })
        cache[slug as string].push(ip)
        res.end("ok")
      }
    } else {
      res.statusCode = 500
      res.end(initialData.error)
    }
  } else {
    res.statusCode = 500
    res.end("No slug found")
  }
})
