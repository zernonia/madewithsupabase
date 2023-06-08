<script setup lang="ts">
const { data } = await useAsyncData(
  'github-star',
  () => $fetch('https://api.github.com/repos/zernonia/madewithsupabase'),
  { pick: ['stargazers_count'] },
)
</script>

<template>
  <a
    rel="noopener"
    class="bg-white rounded-lg border border-gray-500 p-2 text-gray-900 flex items-center"
    style="font-family: Arial, Helvetica, sans-serif; height: 54px"
    href="https://github.com/zernonia/madewithsupabase"
    target="_blank"
    aria-label="Star zernonia/madewithsupabase on GitHub"
  >
    <div class="mr-2">
      <div class="i-mdi:github w-9 h-9" />
    </div>
    <div class="flex-col mr-6">
      <h3 style="font-size: 9px" class="uppercase">Star on</h3>
      <h2 class="leading-4 font-semibold text-xl">Github</h2>
    </div>
    <div class="flex flex-col items-center mr-2">
      <div class="i-mdi:triangle w-3 h-3 mt-1" />
      <span class="text-sm">{{ data.stargazers_count ?? 0 }}</span>
    </div>
  </a>
</template>
