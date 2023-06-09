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
  <NuxtImg
    class="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.02]"
    :class="[
      isBlur ? 'blur-md scale-105 opacity-0' : 'blur-0 scale-100 opacity-100',
    ]"
    :preset="preset"
    loading="lazy"
    v-bind="$attrs"
    provider="supabase"
    @load="removeBlur"
  />
</template>
