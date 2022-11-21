<template>
  <div class="flex mt-8 relative w-full">
    <Swiper
      v-if="data.length"
      :slides-per-view="1"
      :space-between="40"
      :pagination="{ clickable: true }"
      :autoplay="{ delay: 5000, pauseOnMouseEnter: true }"
      class="relative w-full max-w-screen-lg border-5 border-dark-300 rounded-2xl bg-dark-600"
    >
      <SwiperSlide
        class="w-full !h-auto relative pb-2/3"
        v-for="(image, index) in heroImages"
      >
        <NuxtLink :to="`/p/${data[index].slug}`">
          <CompressedImage
            :preset="'cover'"
            class="absolute w-full h-full object-cover"
            :src="image"
            alt=""
          />
          <h1
            class="absolute left-0 bottom-4 p-4 text-xl sm:text-4xl bg-gradient-to-tr from-emerald-600 to-emerald-400 rounded-r-xl"
          >
            {{ data[index].title }}
          </h1>
        </NuxtLink>
      </SwiperSlide>
    </Swiper>
    <SVGCircle
      class="absolute w-20 h-20 sm:w-30 sm:h-30 lg:left-0 -left-10 -top-10"
    ></SVGCircle>
    <SVGCircle
      class="absolute sm:w-50 sm:h-50 -right-10 -bottom-10"
    ></SVGCircle>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue"
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper"
SwiperCore.use([Pagination, Navigation, Autoplay])

const prop = defineProps({
  data: {
    type: Array as () => any[],
    required: true,
  },
})

const heroImages = computed(() => {
  return prop.data
    .map((item: any) => item.images[0])
    .filter((item: any) => item != undefined)
})
</script>
