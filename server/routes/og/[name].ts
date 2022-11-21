import { satori } from "v-satori"
import { readFileSync } from "fs"
import { join } from "path"
import { useSupabaseServer } from "~~/composables/supabase"
import OG from "~~/components/OG.vue"

export default eventHandler(async (event) => {
  const name = event.context.params.name
  if (!name) return sendError(event, new Error("No name is found"))

  const client = useSupabaseServer()
  const { data } = await client
    .from("products")
    .select("title, twitter, images")
    .eq("slug", name)
    .single()

  const buffer = readFileSync(
    join(process.cwd(), "assets/fonts/", "custom-font.ttf")
  )

  const svg = await satori(OG, {
    props: {
      title: data?.title,
      author: data?.twitter,
      cover_img: data?.images?.[0],
    },
    width: 1200,
    height: 627,
    fonts: [
      {
        name: "custom-font",
        data: buffer,
        weight: 400,
        style: "normal",
      },
    ],
  })

  setHeader(event, "Content-Type", "image/svg+xml")
  return svg
})
