import sharp from "sharp"
import axios from "axios"
import type { IncomingMessage, ServerResponse } from "http"
import { useQuery } from "h3"

export default async (req: IncomingMessage, res: ServerResponse) => {
  const { w, h, link } = useQuery(req)

  if (link) {
    const url = "https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/" + link
    const buffer = (await axios({ url, responseType: "arraybuffer" })).data as Buffer

    const size = {
      w: w ? +w : 800,
      h: h ? +h : null,
    }
    if (w) {
      const data = await sharp(buffer).resize(size.w, size.h).jpeg().toBuffer()
      res.setHeader("Cache-Control", `public, immutable, no-transform, s-maxage=604800, max-age=604800`)
      res.setHeader("Content-Type", "image/png")
      res.end(data)
    } else {
      res.statusCode = 200
      res.setHeader("Cache-Control", `public, immutable, no-transform, s-maxage=604800, max-age=604800`)
      res.setHeader("Content-Type", "image/png")
      res.end(buffer)
    }
  } else {
    res.statusCode = 500
    res.setHeader("Content-Type", "text/html")
    res.end("<h1>Internal Error</h1><p>Sorry, there was a problem</p>")
  }
}
