<script setup lang="ts">
const { meta } = toRefs(useRoute())
</script>

<template>
  <div
    class="bg-dark-900 text-light-200 h-full w-full min-h-screen flex justify-center"
  >
    <div
      class="fixed top-0 left-0 w-screen h-screen"
      style="
        background: linear-gradient(
            40deg,
            rgba(15, 15, 15, 1),
            rgba(35, 35, 35, 0.85),
            rgba(0, 245, 169, 0.6)
          ),
          url(./noise.svg);
      "
    ></div>

    <SideMenu class="z-10 fixed top-0 left-0"></SideMenu>

    <div class="z-10 flex-1 p-6 ml-92">
      <div class="mx-auto max-w-7xl my-24">
        <div class="flex items-center">
          <h1 class="text-4xl">{{ meta.title }}</h1>
          <button v-if="meta.back" @click="$router.go(-1)">
            <div class="i-mdi-arrow-left ml-4 mt-1 text-2xl"></div>
          </button>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
