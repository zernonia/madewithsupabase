<script setup lang="ts">
const { meta } = toRefs(useRoute())
</script>

<template>
  <div
    class="bg-dark-900 text-light-200 h-full w-full min-h-screen flex justify-center"
  >
    <Transition mode="out-in" name="fade">
      <div
        :key="meta.noise_bg_color?.toString()"
        class="fixed top-0 left-0 w-screen h-screen noise-bg"
        :style="{ '--noise-bg-color': meta.noise_bg_color }"
      ></div>
    </Transition>

    <SideMenu class="z-10 fixed top-0 left-0"></SideMenu>

    <div class="z-10 flex-1 p-6 ml-92">
      <div class="mx-auto max-w-7xl my-24">
        <Transition name="fade" appear mode="out-in">
          <div class="flex items-center" :key="meta.title?.toString() || ''">
            <h1 class="text-4xl">{{ meta.title }}</h1>
            <button v-if="meta.back" @click="$router.go(-1)">
              <div class="i-mdi-arrow-left ml-4 mt-1 text-2xl"></div>
            </button>
          </div>
        </Transition>

        <slot></slot>
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
    url(./noise.svg);
}
</style>
