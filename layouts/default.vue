<script setup lang="ts">
const { el } = useInfiniteBus()

const { meta } = toRefs(useRoute())
</script>

<template>
  <div
    class="bg-dark-900 text-light-200 h-full w-full min-h-screen flex justify-center"
  >
    <SideMenu></SideMenu>

    <div
      ref="el"
      id="container"
      class="flex-1 ml-16 p-6 max-h-screen overflow-y-auto"
    >
      <h1 class="text-4xl mt-24">{{ meta.title }}</h1>
      <slot></slot>
    </div>
  </div>
</template>
