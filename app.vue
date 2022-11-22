<script setup lang="ts">
const route = useRoute()

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const routeName = computed(() =>
  capitalizeFirstLetter(route.name?.toString() || "")
)

useHead(() => ({
  title: routeName.value,
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} | Made with Supabase`
      : "Made with Supabase"
  },
}))
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>
