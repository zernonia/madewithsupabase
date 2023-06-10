<script setup lang="ts">
import autoAnimate from '@formkit/auto-animate'

const { meta, name, path } = toRefs(useRoute())

const user = useSupabaseUser()
const userAvatar = computed(() => user.value?.user_metadata?.avatar_url)

const isSideMenuOpen = ref(false)
watch(name, () => {
  isSideMenuOpen.value = false
})

const isBackButtonShowing = computed(() => {
  if (process.server)
    return false
  return window.history.length > 2 && path.value !== '/'
})

const metaTitleRef = ref()

onMounted(() => {
  autoAnimate(metaTitleRef.value)
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
        class="justify-center"
      >
        <NuxtLink to="/" class="text-gray-500 hover:text-white transition">
          <UIcon name="i-lucide-home" />
        </NuxtLink>
      </UTooltip>

      <UTooltip
        text="Tags" :shortcuts="['2']" :popper="{
          placement: 'right',
        }"
        class="justify-center"
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
        class="justify-center"
      >
        <NuxtLink to="/account" class="text-gray-500 hover:text-white transition">
          <UAvatar v-if="userAvatar" :src="userAvatar" alt="Avatar" />
          <UIcon v-else name="i-lucide-user" />
        </NuxtLink>
      </UTooltip>

      <UTooltip
        text="Back" :shortcuts="['Backspace']" :popper="{
          placement: 'right',
        }"
        :class="{ 'opacity-100': isBackButtonShowing }"
        class="justify-center opacity-0 transition-opacity"
      >
        <NuxtLink class="text-gray-500 hover:text-white transition" @click="isBackButtonShowing && $router.back()">
          <UIcon name="i-lucide-arrow-left" />
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

        <div ref="metaTitleRef" class="flex items-center justify-center w-[32rem]">
          <h2 v-if="meta.title" :key="meta.title" class="text-center text-5xl text-gray-300 my-2 font-medium">
            {{ meta.title }}
          </h2>
        </div>

        <h1 class="mt-2 font-medium text-center transition-all duration-500 ease-in-out" :class="[meta.title ? 'text-2xl ' : 'text-3xl ']">
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
