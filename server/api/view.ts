import { useSupabaseServer } from "~~/composables/supabase"

let cache: any = {}
export default defineEventHandler(async (event) => {
  const client = useSupabaseServer()
  const { name } = getQuery(event)
  const { res, req } = event

  const ip = req.headers["x-forwarded-for"] || "::1"

  if (!cache[name as string]) {
    cache[name as string] = []
  }

  if (name) {
    const initialData = await client
      .from("products")
      .select("*")
      .eq("slug", name)
      .single()
    if (!initialData.error) {
      if (cache[name as string].findIndex((i: any) => i == ip) > -1) {
        res.end("cache")
      } else {
        await client.from("views").insert({
          ip_address: ip.toString(),
          product_id: initialData.data.id,
        })
        cache[name as string].push(ip)
        res.end("ok")
      }
    } else {
      res.statusCode = 500
      res.end("error")
    }
  } else {
    res.statusCode = 500
    res.end("error")
  }
})
