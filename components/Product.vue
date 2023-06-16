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
    <h1 v-if="isModal" class="text-center text-2xl md:text-4xl font-medium">
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

      <div class="flex items-center gap-2 mt-4 justify-end">
        <LegoSocialShare>
          <LegoSocialShareTwitter
            :text="tweetText"
          >
            <UTooltip text="Share to Twitter">
              <UButton
                icon="i-lucide-share-2"
                variant="ghost"
                color="gray"
              />
            </UTooltip>
          </LegoSocialShareTwitter>
        </LegoSocialShare>

        <UTooltip text="Project's Twitter">
          <UButton
            v-if="data.twitter"
            :to="`https://twitter.com/${data.twitter}`"
            target="_blank"
            icon="i-lucide-twitter"
            variant="ghost"
            color="gray"
          />
        </UTooltip>

        <UTooltip v-if="data.github_url" text="Project's GitHub">
          <UButton

            :to="data.github_url"
            target="_blank"
            icon="i-lucide-github"
            variant="ghost"
            color="gray"
          />
        </UTooltip>

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
