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
    transpile: ["dayjs", "swiper"],
  },
  modules: ["@unocss/nuxt", "@nuxt/image-edge", "v-satori/nuxt"],
  image: {
    domains: ["dohemiycqebeipbvsvnr.supabase.co"],
    presets: {
      cover: {
        modifiers: {
          format: "jpg",
          quality: 80,
          sizes: "sm:100vw md:50vw lg:800px",
        },
      },
      card: {
        modifiers: {
          format: "jpg",
          quality: 70,
          sizes: "sm:100vw md:40vw lg:300px",
        },
      },
    },
  },
  unocss: {
    // presets
    uno: true, // enabled `@unocss/preset-uno`
    icons: true, // enabled `@unocss/preset-icons`,
    typography: {
      cssExtend: {
        strong: {
          color: "white",
          fontWeight: "500",
        },
        code: {
          "background-color": "#2d2d2d !important",
        },
        "code::before": {
          content: '""',
        },
        "code::after": {
          content: '""',
        },
        pre: {
          "background-color": "#2d2d2d !important",
        },
        hr: {
          borderTop: "1px solid #2d2d2d",
        },
        a: {
          color: "#d6d9dc",
        },
        "a:hover": {
          color: "#10b981",
        },
        "ol > li::before": {
          color: "#56524e",
        },
        "ul > li::before": {
          color: "#56524e",
          "background-color": "#56524e !important",
        },
      },
    },
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
      SUPABASE_KEY: process.env.SUPABASE_KEY,
    },
    SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
  },
})
