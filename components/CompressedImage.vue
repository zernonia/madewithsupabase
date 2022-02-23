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
    <div
      v-if="isLoading"
      class="absolute w-full h-full flex items-center justify-center"
    >
      <SVGCircle class="animate-ping w-12 h-12"></SVGCircle>
    </div>
  </div>
</template>

<script setup lang="ts">
import { state } from "@/script/store"
import SiteLogo from "@/assets/logo.svg"

const prop = defineProps({
  src: {
    type: String,
    required: true,
  },
  srcPlaceholder: {
    type: String,
    default: SiteLogo,
  },
})

const isLoading = ref(!process.server)
const target = ref()

watch(
  target,
  () => {
    isLoading.value = !target.value?.complete
  },
  { immediate: true }
)

const compressedImage = computed(
  () =>
    "../api/resize?link=" +
    prop.src.split("products/")[1] +
    `&w=${state.deviceWidth}`
)
</script>
