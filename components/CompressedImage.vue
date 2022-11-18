<template>
  <NuxtImg
    ref="el"
    class="absolute w-full h-full object-cover transition-all duration-1000"
    :class="[isBlur ? 'blur-md scale-105' : 'blur-0 scale-100']"
    :preset="preset"
    loading="lazy"
    v-bind="$attrs"
    @load="removeBlur"
  />
</template>

<script setup lang="ts">
import { PropType } from "vue"

defineProps({
  preset: {
    type: String as PropType<"cover" | "card">,
    default: "card",
  },
})

const isBlur = ref(!process.server)
const removeBlur = () => {
  console.log("loaded")
  isBlur.value = false
}

const el = ref()
// onMounted(() => {
//   isBlur.value = true
//   console.log(el.value)
//   console.log(el.value.loading)
// })
</script>
