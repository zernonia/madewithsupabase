<template>
  <div>
    <transition name="fade">
      <img
        @load="isLoading = false"
        class="absolute w-full h-full object-cover"
        v-show="!isLoading"
        ref="target"
        :src="compressedImage"
        alt=""
      />
    </transition>
    <div v-if="isLoading" class="absolute w-full h-full flex items-center justify-center">
      <SVGCircle class="animate-ping w-12 h-12"></SVGCircle>
    </div>
  </div>
</template>

<script setup lang="ts">
import { state } from "@/script/store"

const prop = defineProps({
  src: {
    type: String,
    required: true,
  },
  srcPlaceholder: {
    type: String,
    default: "../assets/logo.svg",
  },
})

const isLoading = ref(true)
const target = ref()
onMounted(() => {
  isLoading.value = !target.value.complete
})

const compressedImage = computed(
  () => "../api/resize?link=" + prop.src.split("products/")[1] + `&w=${state.deviceWidth}`
)
</script>
