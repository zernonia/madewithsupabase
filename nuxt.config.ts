import transformerDirective from "@unocss/transformer-directives"

export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [{ rel: "icon", type: "image/svg", href: "/logo.svg" }],
    },
  },
  build: {
    transpile: ["dayjs", "swiper", "node-fetch"],
  },
  modules: ["@unocss/nuxt"],
  unocss: {
    // presets
    uno: true, // enabled `@unocss/preset-uno`
    icons: true, // enabled `@unocss/preset-icons`,
    transformers: [transformerDirective({ enforce: "pre" })], // enabled `@unocss/transformer-directives`,
  },
  css: [
    "@unocss/reset/tailwind.css",
    "@/assets/main.css",
    "swiper/swiper.min.css",
    "swiper/components/navigation/navigation.min.css",
    "swiper/components/pagination/pagination.min.css",
  ],
  runtimeConfig: {
    public: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    },
  },
})
