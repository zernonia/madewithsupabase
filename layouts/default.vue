<script setup lang="ts">
const { meta, name } = toRefs(useRoute())

const isSideMenuOpen = ref(false)
watch(name, () => {
  isSideMenuOpen.value = false
})
</script>

<template>
  <div
    class="bg-gray-800 text-white h-full w-full min-h-screen flex"
  >
    <div class="p-5 border-r border-gray-700 sticky top-0 h-screen flex flex-col justify-center space-y-5 text-2xl">
      <UTooltip
        text="Home" :shortcuts="['1']" :popper="{
          placement: 'right',
        }"
      >
        <NuxtLink to="/" class="text-gray-500 hover:text-white transition">
          <UIcon name="i-lucide-home" />
        </NuxtLink>
      </UTooltip>

      <UTooltip
        text="Tags" :shortcuts="['2']" :popper="{
          placement: 'right',
        }"
      >
        <NuxtLink to="/tag" class="text-gray-500 hover:text-white transition">
          <UIcon name="i-lucide-tag" />
        </NuxtLink>
      </UTooltip>

      <hr class="border-gray-700">

      <UTooltip
        text="Account" :shortcuts="['3']" :popper="{
          placement: 'right',
        }"
      >
        <NuxtLink to="/account" class="text-gray-500 hover:text-white transition">
          <UIcon name="i-lucide-user" />
        </NuxtLink>
      </UTooltip>
    </div>

    <div class="py-6 px-12 mx-auto max-w-5xl w-full">
      <div class="flex flex-col items-center mt-4 justify-center">
        <NuxtLink to="/">
          <img class="md:w-28 md:h-28" src="@/assets/logo.svg" alt="">
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

        <h1 class="text-3xl mt-2 text-center">
          Made with Supabase
        </h1>
      </div>

      <slot />
    </div>
  </div>
</template>

<style>
.router-link-active {
  @apply text-white
}
</style>
