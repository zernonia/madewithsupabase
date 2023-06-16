import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  app: {
    head: {
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
    '@nuxt/devtools',
    '@nuxthq/ui',
    '@nuxtjs/supabase',
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
    'nuxt-seo-kit',
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

      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://madewithsupabase.com',
      siteName: 'Made with Supabase',
      siteDescription: 'A collection of projects made with Supabase – Websites, Mobile Apps, SaaS, Plugins and more!',
      titleSeparator: '|',
      language: 'en',
    },
    SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
  },

  routeRules: {
    '/': { swr: true },
    '/p/**': { swr: true },
    '/tag': { swr: true },
    '/tag/**': { swr: true },

    '/hackathons': { static: true },
    '/bring-the-func': { redirect: '/hackathons/bring-the-func' },
    '/flutter-hackathon': { redirect: '/hackathons/flutter-hackathon' },
    '/hacktoberfest': { redirect: '/hackathons/hacktoberfest' },
    '/holiday-hackdays': { redirect: '/hackathons/holiday-hackdays' },
    '/launch-week-5': { redirect: '/hackathons/launch-week-5' },
    '/launch-week-6': { redirect: '/hackathons/launch-week-6' },
    '/launch-week-7': { redirect: '/hackathons/launch-week-7' },
  },

  experimental: {
    typedPages: true,
  },

  ogImage: {
    defaults: {
      component: 'OgDefault',
    },
    fonts: [
      // will load the Noto Sans font from Google fonts
      'Inter:400',
      'Inter:500',
      'Inter:600',
    ],
  },

  nitro: {
    prerender: { crawlLinks: false },
  },

  plugins: ['~/plugins/analytics.client.ts'],
})
