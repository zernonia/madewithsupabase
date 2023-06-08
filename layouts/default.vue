<script setup lang="ts">
import { OnClickOutside } from '@vueuse/components'

const { meta, name } = toRefs(useRoute())

const isSideMenuOpen = ref(false)
watch(name, () => {
  isSideMenuOpen.value = false
})
</script>

<template>
  <div
    class="bg-gray-900 text-white h-full w-full min-h-screen flex justify-center"
  >
    <Transition mode="out-in" name="fade">
      <div
        :key="meta.noise_bg_color?.toString()"
        class="fixed top-0 left-0 w-screen h-screen noise-bg"
        :style="{ '--noise-bg-color': meta.noise_bg_color }"
      />
    </Transition>

    <OnClickOutside @trigger="isSideMenuOpen = false">
      <SideMenu
        class="z-20 fixed top-0 left-0 transition md:translate-x-0 duration-500 ease-in-out"
        :class="[
          isSideMenuOpen ? 'translate-x-0 modal-open' : '-translate-x-full ',
        ]"
      />
    </OnClickOutside>

    <div
      class="z-10 flex-1 p-3 sm:p-6 md:ml-92"
      :class="{ 'pointer-events-none': isSideMenuOpen }"
    >
      <div class="mx-auto max-w-7xl mb-6 md:my-24">
        <div class="md:hidden flex justify-between">
          <button class="md:hidden my-6" @click="isSideMenuOpen = true">
            <div class="i-mdi-menu text-3xl" />
          </button>

          <NuxtLink to="/">
            <img class="w-20 h-20" src="@/assets/logo.svg" alt="">
          </NuxtLink>
        </div>

        <Transition name="fade" appear mode="out-in">
          <div
            :key="meta.title?.toString() || ''"
            class="flex items-center gap-4"
          >
            <h1 class="text-3xl md:text-4xl">
              {{ meta.title }}
            </h1>
            <button v-if="meta.back" @click="$router.go(-1)">
              <div class="i-mdi-arrow-left mt-1 text-2xl" />
            </button>
          </div>
        </Transition>

        <slot />
      </div>
    </div>
  </div>
</template>

<style>
.noise-bg {
  background: linear-gradient(
      var(
        --noise-bg-color,
        40deg,
        rgba(15, 15, 15, 1),
        rgba(35, 35, 35, 0.85),
        rgba(0, 245, 169, 0.6)
      )
    ),
    url(../noise.svg);
}

body:has(.modal-open) {
  @apply overflow-hidden;
}
</style>
