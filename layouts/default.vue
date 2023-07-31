<script setup lang="ts">
import autoAnimate from '@formkit/auto-animate'

const { meta, path } = toRefs(useRoute())

const metaTitleRef = ref()

onMounted(() => {
  autoAnimate(metaTitleRef.value)
})
</script>

<template>
  <div
    class=" bg-gray-800 text-white h-full w-full min-h-screen flex"
  >
    <SideMenu />

    <div class="p-3 sm:py-6 sm:px-6 md:px-12 relative mx-auto max-w-5xl w-full">
      <div class="flex flex-col items-center mt-4 justify-center">
        <NuxtLink to="/">
          <img class="w-16 h-16 md:w-28 md:h-28" src="@/assets/logo.svg" alt="">
        </NuxtLink>

        <div class="mt-2 flex items-center justify-center space-x-4">
          <UTooltip text="Star on GitHub">
            <NuxtLink to="https://github.com/zernonia/madewithsupabase" target="_blank" class="mt-4 text-2xl text-gray-500 hover:text-white transition">
              <UIcon name="i-lucide-github" />
            </NuxtLink>
          </UTooltip>
          <UTooltip text="Follow on Twitter">
            <NuxtLink to="https://twitter.com/madewifsupabase" target="_blank" class="mt-4 text-2xl text-gray-500 hover:text-white transition">
              <UIcon name="i-lucide-twitter" />
            </NuxtLink>
          </UTooltip>
        </div>

        <div ref="metaTitleRef" class="flex items-center justify-center w-full md:w-[32rem]">
          <h2 v-if="meta.title" :key="meta.title.toString()" class="text-center text-3xl md:text-5xl text-gray-300 my-2 font-medium">
            {{ meta.title }}
          </h2>
        </div>

        <NuxtLink v-if="path === '/'" to="https://github.com/zernonia/madewithsupabase/releases" target="_blank" class="inline-flex text-sm space-x-2 items-center px-6 py-2.5 text-gray-100 my-4 rounded-full border border-primary-700 bg-primary-700 bg-opacity-20 hover:bg-opacity-40 transition-all duration-500">
          <UIcon name="i-lucide-sparkles" class="text-base" />
          <span>New Changes!</span>
          <UIcon name="i-lucide-arrow-right" class="text-base" />
        </NuxtLink>

        <h1 class="font-medium text-center transition-all duration-500 ease-in-out" :class="[meta.title ? 'text-lg md:text-2xl ' : 'text-xl md:text-3xl ']">
          Made with Supabase
        </h1>
      </div>

      <slot />

      <hr class="mt-12 mb-4 border-gray-700">

      <div class="text-sm text-gray-500">
        A project by <NuxtLink to="https://twitter.com/zernonia" target="_blank">
          Zernonia
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style>
.router-link-active {
  @apply text-white
}
</style>
