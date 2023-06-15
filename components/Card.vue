<script setup lang="ts">
import removeMd from 'remove-markdown'
import SiteLogo from '@/assets/logo.svg'
import type { Project } from '@/types'

const props = withDefaults(defineProps<{
  item?: Project
  showModal?: boolean
  path?: string
}>(), {
  item: undefined,
  showModal: true,
})

const client = useSupabase()

function cleanse(text: string | null) {
  if (!text)
    return ''
  const t = text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')
  return removeMd(t).slice(0, 100)
}

const routeModal = useRouteModal()
function handleUserClick(ev: Event) {
  if (props.showModal) {
    ev.preventDefault()
    ev.stopPropagation()

    routeModal.value = {
      isOpen: true,
      path: `/p/${props.item?.slug}`,
    }
  }
}

const image = computed(() => {
  const key = props.item?.image_keys?.[0]
  if (key)
    return client.storage.from('products').getPublicUrl(key.replace('products/', '')).data.publicUrl

  else
    return props.item?.images?.[0]
})
</script>

<template>
  <NuxtLink v-if="item?.slug" :to="`/p/${item.slug}`" class="h-full group">
    <div
      class="border border-gray-700 bg-gray-700 bg-opacity-20 hover:bg-opacity-50 h-full rounded-2xl p-2 transition duration-500 ease-in-out overflow-hidden "
      @click="handleUserClick"
    >
      <h1 class="text-[15px] mt-1 mb-2 ml-2 text-gray-200 whitespace-pre-wrap">
        {{ item.title }}
      </h1>
      <p class="leading-4 text-[13px] ml-2 mb-3 text-gray-500 group-hover:text-gray-400 transition duration-500">
        {{ cleanse(item.description) }}
      </p>
      <div class="relative flex-shrink-0 overflow-hidden aspect-[16/9] rounded-lg">
        <CompressedImage
          v-if="image"
          class="object-cover"
          :alt="item.title"
          :src="image"
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
