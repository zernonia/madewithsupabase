import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [{ rel: 'icon', type: 'image/svg', href: '/logo.svg' }],
    },
    layoutTransition: { name: 'fade', mode: 'out-in' },
    pageTransition: {
      name: 'fade',
      mode: 'out-in',
    },
  },
  modules: [
    '@nuxt/image',
    '@nuxthq/ui',
    '@nuxtjs/supabase',
    'v-satori/nuxt',
    '@formkit/nuxt',
    '~~/modules/server-assets',
  ],
  image: {
    providers: {
      customProvider: {
        name: 'supabase', // optional value to overrider provider name
        provider: '~/utils/image-provider', // Path to custom provider
      },
    },
    presets: {
      cover: {
        modifiers: {
          width: 800,
          resize: 'contain',
        },
      },
      card: {
        modifiers: {
          width: 400,
          resize: 'contain',
        },
      },
    },
  },

  build: {
    transpile: ['vue-filepond', 'filepond'],
  },

  ui: {
    icons: ['heroicons', 'lucide'],
  },

  extends: [
    'nuxt-lego',
  ],

  css: [
    '@/assets/main.css',
    'swiper/css',
    'swiper/css/navigation',
    'swiper/css/pagination',
  ],
  runtimeConfig: {
    public: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY,
    },
    SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
  },
  routeRules: {
    '/**': { isr: 3600 },
  },

})
