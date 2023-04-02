<template>
  <Swiper
    v-if="images.length"
    :slides-per-view="'auto'"
    :space-between="40"
    :pagination="{ clickable: true }"
    class="relative w-full mt-8 border rounded-2xl"
  >
    <SwiperSlide class="w-full !h-auto relative pb-9/16" v-for="image in images"
      ><CompressedImage
        :preset="'cover'"
        class="absolute w-full h-full object-cover"
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
