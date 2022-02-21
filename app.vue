<template>
  <div>
    <div>
      <CustomMeta
        :key="routeName"
        :title="routeName + ' ⚡ Made with Supabase'"
      />
      <NuxtLayout>
        <NuxtPage></NuxtPage>
      </NuxtLayout>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const routeName = computed(() => capitalizeFirstLetter(route.name.toString()))
</script>
