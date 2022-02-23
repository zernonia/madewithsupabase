import { supabase } from "../_lib/supabase"
import type { IncomingMessage, ServerResponse } from "http"
import { useQuery } from "h3"

let cache: any = {}
export default async (req: IncomingMessage, res: ServerResponse) => {
  const { name } = useQuery(req)

  const ip = req.headers["x-forwarded-for"] || "::1"

  if (!cache[name as string]) {
    cache[name as string] = []
  }

  if (name) {
    const initialData = await supabase
      .from("products")
      .select("*")
      .eq("slug", name)
      .single()
    if (!initialData.error) {
      if (cache[name as string].findIndex((i: any) => i == ip) > -1) {
        res.end("cache")
      } else {
        const { data, error } = await supabase.from("views").insert({
          ip_address: ip,
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
}
