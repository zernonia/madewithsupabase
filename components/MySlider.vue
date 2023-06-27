<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import SwiperCore, { Navigation, Pagination } from 'swiper'

const props = defineProps({
  images: {
    type: Array as () => string[],
    required: true,
  },
})

SwiperCore.use([Pagination, Navigation])

const client = useSupabase()
const images = computed(() => {
  return props.images.map(key => client.storage.from('products').getPublicUrl(key.replace('products/', '')).data.publicUrl)
})
</script>

<template>
  <Swiper
    v-if="images.length"
    slides-per-view="auto"
    :centered-slides="images.length === 1"
    :space-between="40"
    :pagination="{ clickable: true }"
  >
    <SwiperSlide v-for="image in images" :key="image" class="w-full md:w-auto md:min-h-[24rem]">
      <CompressedImage
        class="rounded-xl max-h-[32rem] object-contain"
        preset="cover"
        :src="image"
        alt=""
      />
    </SwiperSlide>
  </Swiper>
</template>
