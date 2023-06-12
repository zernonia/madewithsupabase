<script setup lang="ts">
import type { Project } from '@/types'

const props = defineProps<{
  data: Project
  isModal?: boolean
}>()
const { data } = toRefs(props)

const tweetText = computed(() => {
  if (!data.value)
    return
  return `Check out ${data.value.title} ${
    data.value.twitter ? `by @${data.value.twitter}` : ''
  }`
})

const computedUrl = computed(() => {
  const url = new URL(data.value?.url ?? '')
  url.searchParams.set('ref', 'madewithsupabase')
  return url.href
})

onMounted(() => {
  $fetch(`/api/view/${data.value.slug}`)
})
</script>

<template>
  <div v-if="data.id">
    <h1 v-if="isModal" class="text-center text-4xl font-medium">
      {{ data.title }}
    </h1>

    <div
      v-if="data.images?.length"
      class="mt-6 rounded-xl overflow-hidden"
    >
      <MySlider :images="data.images ?? []" />
    </div>

    <div
      class="mt-4 flex flex-col md:flex-row justify-between md:items-center"
    >
      <SupabaseFeatures
        :features="data.supabase_features"
      />

      <div class="flex items-center gap-4 mt-4 justify-end">
        <!-- <a :href="tweetLink" target="_blank" rel="noopener">
              </a> -->

        <LegoSocialShare class="text-3xl flex space-x-3">
          <LegoSocialShareTwitter
            class="text-white hover:text-gray-100 transition"
            :text="tweetText"
          >
            <div class="i-mdi-share-variant w-7 h-7" />
          </LegoSocialShareTwitter>
        </LegoSocialShare>

        <a
          v-if="data.twitter"
          :href="`https://twitter.com/${data.twitter}`"
          target="_blank"
          rel="noopener"
        ><div class="i-mdi:twitter w-7 h-7" />
        </a>
        <a
          v-if="data.github_url"
          :href="data.github_url"
          target="_blank"
          rel="noopener"
        ><div class="i-mdi:github w-7 h-7" />
        </a>

        <UButton :to="computedUrl" size="md" target="_blank" label="Visit Website" />
      </div>
    </div>

    <div class="mt-6 md:mt-12 w-full flex flex-col placeholder-rose-50">
      <Marked
        class="max-w-none"
        :text="data.description?.replace(/<|>/gi, '')"
      />

      <div class="flex flex-wrap items-center mt-8">
        <UButton v-for="category in data.categories" :key="category" class="mr-2 mb-2" :to="`/tag/${category}`" :label="category" color="gray">
          <template #leading>
            <UIcon name="i-lucide-hash" />
          </template>
        </UButton>
      </div>
    </div>
  </div>
</template>
