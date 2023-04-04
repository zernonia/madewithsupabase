<template>
  <div class="mt-6">
    <div class="flex items-center text-xl w-full">
      <NuxtLink
        class="m-1 px-4 py-2 text-sm md:text-base bg-dark-500 bg-opacity-50 hover:bg-white hover:text-dark transition rounded-lg inline-flex items-center justify-center"
        :class="{
          '!bg-white text-dark': `${item.value}` === $route.params.slug,
        }"
        v-for="item in availableMonth"
        :to="`/month/${item.value}`"
      >
        {{ item.label }}
      </NuxtLink>
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
  title: "Month",
})
</script>
