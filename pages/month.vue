<template>
  <div class="mt-12 min-h-screen-md">
    <div class="flex flex-col items-center justify-center text-xl w-full">
      <h2 class="mb-2">Month:</h2>
      <div class="flex items-center justify-center space-x-2">
        <NuxtLink
          class="w-12 h-12 bg-dark-500 hover:bg-dark-300 border-3 border-dark-200 transition rounded-lg inline-flex items-center justify-center"
          :class="{ '!bg-dark-300': `${i}` === $route.params.slug }"
          v-for="i in todayMonth"
          :to="`/month/${i}`"
        >
          {{ i }}
        </NuxtLink>
      </div>
    </div>
    <NuxtPage></NuxtPage>
  </div>
</template>

<script setup lang="ts">
const todayMonth = computed(() => new Date().getMonth() + 1)

definePageMeta({
  pageTransition: {
    name: "fade",
    mode: "out-in",
  },
})
</script>
