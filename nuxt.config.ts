import { defineNuxtConfig } from "nuxt3"
import Components from "unplugin-vue-components/vite"
import Icons from "unplugin-icons/vite"
import IconsResolver from "unplugin-icons/resolver"

export default defineNuxtConfig({
  meta: {
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "A collection of projects made with Supabase – Websites, Mobile Apps, SaaS, Plugins and more!",
      },
      { name: "og:title", content: "Showcase ⚡ Made with Supabase" },
      { name: "og:site_name", content: "Showcase ⚡ Made with Supabase" },
      {
        name: "og:description",
        content:
          "A collection of projects made with Supabase – Websites, Mobile Apps, SaaS, Plugins and more!",
      },
      { name: "og:type", content: "website" },
      { name: "og:url", content: "https://www.madewithsupabase.com/" },
      { name: "og:image", content: "https://www.madewithsupabase.com/og.png" },

      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@madewifsupabase" },
      { name: "twitter:creator", content: "@madewifsupabase" },
      { name: "twitter:title", content: "Showcase ⚡ Made with Supabase" },
      {
        name: "twitter:description",
        content:
          "A collection of projects made with Supabase – Websites, Mobile Apps, SaaS, Plugins and more!",
      },
      {
        name: "twitter:image",
        content: "https://www.madewithsupabase.com/og.png",
      },
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
    transpile: ["swiper", "node-fetch"],
  },
  buildModules: ["nuxt-windicss"],
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
