<template>
  <div class="mt-12 min-h-screen-md">
    <div class="flex flex-col items-center justify-center text-xl w-full">
      <h2 class="mb-2">Month:</h2>
      <div class="flex flex-wrap items-center justify-center">
        <NuxtLink
          class="m-1 px-3 py-1 text-sm md:text-base bg-dark-500 hover:bg-dark-300 border-3 border-dark-200 transition rounded-lg inline-flex items-center justify-center"
          :class="{ '!bg-dark-300': `${item.value}` === $route.params.slug }"
          v-for="item in availableMonth"
          :to="`/month/${item.value}`"
        >
          {{ item.label }}
        </NuxtLink>
      </div>
    </div>
    <NuxtPage></NuxtPage>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs/esm"

const availableMonth = computed(() => {
  return Array.from(Array(new Date().getMonth() + 1).keys()).map((i) => {
    return {
      value: i + 1,
      label: dayjs().month(i).format("MMM"),
    }
  })
})

definePageMeta({
  pageTransition: {
    name: "fade",
    mode: "out-in",
  },
})
</script>
