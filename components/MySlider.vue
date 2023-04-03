<template>
  <Swiper
    v-if="images.length"
    :slides-per-view="'auto'"
    :centered-slides="images.length === 1"
    :space-between="40"
    :pagination="{ clickable: true }"
  >
    <SwiperSlide v-for="image in images" class="w-auto min-h-64"
      ><CompressedImage
        class="rounded-2xl max-h-3xl object-contain"
        :preset="'cover'"
        :src="image"
        alt=""
    /></SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue"
import SwiperCore, { Pagination, Navigation } from "swiper"

SwiperCore.use([Pagination, Navigation])

const p = defineProps({
  images: {
    type: Array as () => string[],
    required: true,
  },
})
</script>
