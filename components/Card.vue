<script setup lang="ts">
import removeMd from 'remove-markdown'
import SiteLogo from '@/assets/logo.svg'

defineProps<{
  item: {
    slug: string
    title: string
    description: string
    images: string[]
  }
}>()

function cleanse(text: string) {
  const t = text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')
  return removeMd(t).slice(0, 100)
}

function separator(number: number) {
  const str = number.toString().split('.')
  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return str.join('.')
}
</script>

<template>
  <NuxtLink :to="`/p/${item.slug}`" class="h-full group">
    <div
      class="border border-gray-700 bg-gray-700 bg-opacity-20 hover:bg-opacity-50 h-full rounded-2xl p-2 transition duration-500 ease-in-out overflow-hidden "
    >
      <h1 class="text-[15px] mt-1 mb-2 ml-2 text-gray-200 whitespace-pre-wrap">
        {{ item.title }}
      </h1>
      <p class="leading-4 text-[13px] ml-2 mb-3 text-gray-500 group-hover:text-gray-400 transition duration-500">
        {{ cleanse(item.description) }}
      </p>
      <div class="relative flex-shrink-0 overflow-hidden aspect-[16/9] rounded-lg">
        <CompressedImage
          v-if="item.images[0]"
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
    </div>
  </NuxtLink>
</template>
