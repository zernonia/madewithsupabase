import { defineNuxtConfig } from "nuxt"
import Components from "unplugin-vue-components/vite"
import Icons from "unplugin-icons/vite"
import IconsResolver from "unplugin-icons/resolver"

export default defineNuxtConfig({
  meta: {
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    link: [{ rel: "icon", type: "image/svg", href: "/logo.svg" }],
  },
  vite: {
    plugins: [
      Components({
        resolvers: IconsResolver(),
      }),
      Icons(),
    ],
  },
  build: {
    transpile: ["dayjs", "swiper", "node-fetch"],
  },
  modules: ["nuxt-windicss"],
  css: [
    "@/assets/main.css",
    "swiper/swiper.min.css",
    "swiper/components/navigation/navigation.min.css",
    "swiper/components/pagination/pagination.min.css",
  ],
  publicRuntimeConfig: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  },
})
