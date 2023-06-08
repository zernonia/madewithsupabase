<script setup lang="ts">
import removeMd from 'remove-markdown'
import SiteLogo from '@/assets/logo.svg'

const prop = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const trimCategories = computed(() => {
  return prop.item.categories.slice(0, 6)
})

function cleanse(text: string) {
  const t = text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')
  return removeMd(t).slice(0, 140)
}

function separator(number: number) {
  const str = number.toString().split('.')
  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return str.join('.')
}
</script>

<template>
  <NuxtLink :to="`/p/${item.slug}`" class="h-full">
    <div
      class="bg-gray-500 bg-opacity-20 h-full rounded-3xl p-3 hover:scale-110 transition duration-500 ease-in-out overflow-hidden shadow-2xl"
    >
      <div class="flex flex-col rounded-2xl h-full shadow-2xl">
        <div class="relative flex-shrink-0 overflow-hidden">
          <CompressedImage
            v-if="item.images[0]"
            class="aspect-16/9 rounded-2xl"
            :alt="item.title"
            :src="item.images[0]"
          />
          <div
            v-else
            class="absolute w-full h-full flex justify-center items-center object-cover rounded-xl"
          >
            <img
              class="w-24 h-24 opacity-50 filter grayscale"
              :src="SiteLogo"
              alt=""
            >
          </div>
        </div>
        <div class="p-4 sm:p-6 h-full flex flex-col justify-between">
          <h1 class="text-xl">
            {{ item.title }}
          </h1>
          <p
            class="break-words text-white flex-1 my-4 leading-5 line-clamp-3 text-sm"
          >
            {{ cleanse(item.description) }}
          </p>
          <!-- <div class="flex justify-between items-center">
          <div class="flex items-center flex-shrink-0 text-white">
            <p class="mr-1">{{ separator(item.views) }}</p>
            <div class="i-ic:twotone-ads-click"></div>
          </div>
        </div> -->
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
