<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  preset: {
    type: String as PropType<'cover' | 'card'>,
    default: 'card',
  },
})

const isBlur = ref(!process.server)
function removeBlur() {
  isBlur.value = false
}
</script>

<template>
  <img
    class="w-full h-full transition-all duration-500 group-hover:scale-[1.02]"
    :class="[
      isBlur ? 'blur-md scale-105 opacity-0' : 'blur-0 scale-100 opacity-100',
    ]"
    loading="lazy"
    v-bind="$attrs"
    @load="removeBlur"
  >
</template>
