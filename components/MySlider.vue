<template>
  <Swiper
    v-if="images.length"
    :slides-per-view="1"
    :space-between="40"
    :pagination="{ clickable: true }"
    :navigation="{ nextEl: '.image-next', prevEl: '.image-prev' }"
    class="relative w-full mt-8 border-5 border-dark-300 rounded-2xl"
  >
    <SwiperSlide class="w-full !h-auto relative pb-9/16" v-for="image in images"
      ><CompressedImage
        :preset="'cover'"
        class="absolute w-full h-full object-cover"
        :src="image"
        alt=""
    /></SwiperSlide>

    <button
      v-if="images.length > 1"
      slot="container-end"
      class="image-prev absolute flex rounded-full z-20 left-4 top-1/2 -mt-6 w-12 h-auto bg-opacity-50 bg-dark-900 hover:bg-opacity-100"
    >
      <div class="i-ic:baseline-arrow-left w-full h-auto"></div>
    </button>
    <button
      v-if="images.length > 1"
      slot="container-end"
      class="image-next absolute flex rounded-full z-20 right-4 top-1/2 -mt-6 w-12 h-auto bg-opacity-50 bg-dark-900 hover:bg-opacity-100"
    >
      <div class="i-ic:baseline-arrow-right w-full h-auto"></div>
    </button>
  </Swiper>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue"
import SwiperCore, { Pagination, Navigation } from "swiper/core"
SwiperCore.use([Pagination, Navigation])

const p = defineProps({
  images: {
    type: Array as () => string[],
    required: true,
  },
})
</script>
