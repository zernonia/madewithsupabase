<template>
  <div>
    <div>
      <CustomMeta
        :key="routeName"
        :title="routeName + ' | Made with Supabase'"
      />
      <NuxtLayout>
        <NuxtPage></NuxtPage>
      </NuxtLayout>
    </div>

    <Script
      src="https://www.himaker.io/scripts/embed.min.js"
      async
      defer
      data-widget-id="fmbp30ep"
    ></Script>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const routeName = computed(() => capitalizeFirstLetter(route.name.toString()))
</script>
