<script setup lang="ts">
defineProps({
  loading: Boolean,
})
</script>

<template>
  <transition name="fade" mode="out-in">
    <div v-if="loading" class="my-12 mx-auto h-full flex justify-center">
      <SVGCircle class="animate-ping" />
    </div>
  </transition>
</template>
