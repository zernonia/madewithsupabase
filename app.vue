<script setup lang="ts">
const route = useRoute()

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const routeName = computed(() =>
  capitalizeFirstLetter(route.name?.toString() || ''),
)

useHead(() => ({
  title: routeName.value,
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} | Made with Supabase`
      : 'Made with Supabase'
  },
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
}))
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>
