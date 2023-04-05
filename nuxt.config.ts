import transformerDirective from "@unocss/transformer-directives"
import { defineNuxtConfig } from "nuxt/config"

export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [{ rel: "icon", type: "image/svg", href: "/logo.svg" }],
    },
    layoutTransition: { name: "fade", mode: "out-in" },
    pageTransition: {
      name: "fade",
      mode: "out-in",
    },
  },
  modules: [
    "@unocss/nuxt",
    "@nuxt/image-edge",
    "v-satori/nuxt",
    "~~/modules/server-assets",
  ],
  image: {
    providers: {
      customProvider: {
        name: "supabase", // optional value to overrider provider name
        provider: "~/utils/image-provider", // Path to custom provider
      },
    },
    presets: {
      cover: {
        modifiers: {
          width: 800,
          resize: "contain",
        },
      },
      card: {
        modifiers: {
          width: 400,
          resize: "contain",
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
        "pre,code": {
          "white-space": "pre-wrap",
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
        h1: {
          "font-size": "1.75rem",
        },
        h2: {
          "font-size": "1.5rem",
        },
      },
    },
    transformers: [transformerDirective({ enforce: "pre" })], // enabled `@unocss/transformer-directives`,
  },
  css: [
    "@unocss/reset/tailwind.css",
    "@/assets/main.css",
    "swiper/css",
    "swiper/css/navigation",
    "swiper/css/pagination",
  ],
  runtimeConfig: {
    public: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY,
    },
    SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
  },
})
