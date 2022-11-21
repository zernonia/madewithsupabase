import { defineNuxtModule } from "@nuxt/kit"
import { copyFile, cp } from "fs/promises"

export default defineNuxtModule({
  setup(options, nuxt) {
    nuxt.hook("close", async () => {
      await cp(
        "assets/fonts",
        ".vercel/output/functions/__nitro.func/assets/fonts",
        { recursive: true }
      )
    })
  },
})
