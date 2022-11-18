import sharp from "sharp"
import axios from "axios"

export default defineEventHandler(async (event) => {
  const { res } = event.node
  const { w, h, link } = getQuery(event)

  if (link) {
    const url =
      "https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/" +
      link
    const buffer = (await axios({ url, responseType: "arraybuffer" }))
      .data as Buffer

    if (isGif(buffer)) {
      // For Gif
      res.setHeader(
        "Cache-Control",
        `public, immutable, no-transform, s-maxage=604800, max-age=604800`
      )
      res.setHeader("Content-Type", "image/gif")
      res.end(buffer)
    } else {
      // For Non-Gif
      const size = {
        w: w ? +w : 800,
        h: h ? +h : null,
      }
      if (w) {
        const data = await sharp(buffer)
          .resize(size.w, size.h)
          .jpeg()
          .toBuffer()
        res.setHeader(
          "Cache-Control",
          `public, immutable, no-transform, s-maxage=604800, max-age=604800`
        )
        res.setHeader("Content-Type", "image/jpeg")
        res.end(data)
      } else {
        res.statusCode = 200
        res.setHeader(
          "Cache-Control",
          `public, immutable, no-transform, s-maxage=604800, max-age=604800`
        )
        res.setHeader("Content-Type", "image/jpeg")
        res.end(buffer)
      }
    }
  } else {
    res.statusCode = 500
    res.setHeader("Content-Type", "text/html")
    res.end("<h1>Internal Error</h1><p>Sorry, there was a problem</p>")
  }
})

const isGif = (buffer: Buffer) => {
  if (!buffer || buffer.length < 3) {
    return false
  }
  return buffer[0] === 71 && buffer[1] === 73 && buffer[2] === 70
}
