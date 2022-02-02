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
watch(
  route,
  (n) => {
    if (process.client) {
      if (n.params.savePosition) {
        window.scrollTo({ top: n.params.position, behavior: "smooth" })
      }
    }
  },
  { deep: true, immediate: true }
)

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const routeName = computed(() => capitalizeFirstLetter(route.name))
</script>
