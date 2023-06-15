<script setup lang="ts">
import autoAnimate from '@formkit/auto-animate'

const { meta, name, path } = toRefs(useRoute())
const router = useRouter()

const user = useSupabaseUser()
const userAvatar = computed(() => user.value?.user_metadata?.avatar_url)

const isSideMenuOpen = ref(false)
watch(name, () => {
  isSideMenuOpen.value = false
})

const isBackButtonShowing = computed(() => {
  if (process.server)
    return false
  return window.history.length >= 2 && path.value !== '/'
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
    <div class="w-[80px] hidden md:block" />
    <div class="p-3 md:p-5 z-10 bg-gray-800 border-t md:border-t-0 md:border-r border-gray-700 fixed bottom-0 md:bottom-auto left-0 w-screen md:w-max md:h-screen flex md:flex-col justify-around md:justify-center md:space-y-5 text-2xl">
      <UTooltip
        text="Home" :shortcuts="['1']" :popper="{
          placement: 'right',
        }"
        class="justify-center items-center"
      >
        <NuxtLink to="/" class="text-gray-500 hover:text-white transition">
          <UIcon name="i-lucide-home" />
        </NuxtLink>
      </UTooltip>

      <UTooltip
        text="Tags" :shortcuts="['2']" :popper="{
          placement: 'right',
        }"
        class="justify-center items-center"
      >
        <NuxtLink to="/tag" class="text-gray-500 hover:text-white transition">
          <UIcon name="i-lucide-tag" />
        </NuxtLink>
      </UTooltip>

      <UTooltip
        text="Hackathons" :shortcuts="['3']" :popper="{
          placement: 'right',
        }"
        class="justify-center items-center"
      >
        <NuxtLink to="/hackathons" class="text-gray-500 hover:text-white transition">
          <UIcon name="i-lucide-sparkles" />
        </NuxtLink>
      </UTooltip>

      <UTooltip
        text="Submit project" :shortcuts="['3']" :popper="{
          placement: 'right',
        }"
        class="justify-center items-center"
      >
        <NuxtLink to="/submission" class="text-gray-500 hover:text-white transition">
          <UIcon name="i-lucide-mouse-pointer-2" class="rotate-90" />
        </NuxtLink>
      </UTooltip>

      <hr class="hidden md:block border-gray-700">

      <UTooltip
        text="Account" :shortcuts="['3']" :popper="{
          placement: 'right',
        }"
        class="justify-center items-center"
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
        class="hidden md:flex justify-center items-center opacity-0 transition-opacity"
      >
        <NuxtLink class="text-gray-500 hover:text-white transition" @click="isBackButtonShowing && router.back()">
          <UIcon name="i-lucide-arrow-left" />
        </NuxtLink>
      </UTooltip>
    </div>

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

        <h1 class="mt-2 font-medium text-center transition-all duration-500 ease-in-out" :class="[meta.title ? 'text-lg md:text-2xl ' : 'text-xl md:text-3xl ']">
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
