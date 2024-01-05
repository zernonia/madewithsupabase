<!-- eslint-disable no-alert -->
<script setup lang="ts">
import type { Database, Project } from '@/types'

const props = defineProps<{
  data: Project
  isModal?: boolean
  isAdmin?: boolean
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

function containsTeamInfo(value: Project): value is Database['public']['Tables']['products']['Row'] {
  return Object.keys(value).includes('team_info')
}

async function copyProjectInfoToClipboard() {
  const project = data.value
  if (!project.github_url)
    return alert('This project does not have a GitHub URL')

  if (!containsTeamInfo(project))
    return alert('This project does not contain team_info')

  if (!project.team_info)
    return alert('team_info is null')

  if (project.team_info.length === 0)
    return alert('team_info is empty')

  const authorTexts = project.team_info.map(
    (user: any) => `[@${user?.handler}](https://twitter.com/${user?.handler})`,
  )

  let authorText: string
  if (authorTexts.length === 1)
    authorText = authorTexts[0]
  else
    authorText = `${authorTexts.slice(0, authorTexts.length - 1).join(', ')} and ${authorTexts[authorTexts.length - 1]}`

  await navigator.clipboard.writeText(`[${project.title}](${project.github_url}) - by ${authorText}`)

  alert('Copied to clipboard')
}

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
      v-if="data.image_keys?.length"
      class="mt-6 rounded-xl overflow-hidden"
    >
      <MySlider :images="data.image_keys ?? []" />
    </div>

    <div
      class="mt-4 flex flex-col md:flex-row justify-between md:items-center"
    >
      <SupabaseFeatures
        :features="data.supabase_features"
      />

      <div class="flex items-center gap-2 mt-4 justify-end">
        <UTooltip v-show="isAdmin" text="Copy Product and author as Markdown">
          <UButton
            icon="i-lucide-copy"
            variant="ghost"
            color="gray"
            label="Copy as Markdown"
            @click="copyProjectInfoToClipboard"
          />
        </UTooltip>

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

        <UTooltip v-if="data.twitter" text="Project's Twitter">
          <UButton
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
