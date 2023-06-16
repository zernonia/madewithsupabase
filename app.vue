<script setup lang="ts">
useHead({
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap',
      crossorigin: '',
    },
  ],
})

useSeoMeta({
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <NuxtLayout>
    <SeoKit />
    <!-- a. Generates browser screenshots for every page -->
    <OgImageScreenshot />
    <!-- b. Generate saotir images for every page (uses the default template) -->
    <OgImageStatic />

    <NuxtLoadingIndicator />
    <NuxtPage />

    <RouteModalProduct />
  </NuxtLayout>
  <UNotifications />
</template>
