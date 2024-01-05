<!-- eslint-disable no-alert -->
<script setup lang="ts">
import type { Project, ProjectTable } from '@/types'

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

function containsTeamInfo(project: Project): project is ProjectTable {
  return Object.keys(project).includes('team_info')
}

function getProject(): ProjectTable {
  const project = data.value

  if (!project.github_url) {
    alert('This project does not have a GitHub URL')
    throw new Error('This project does not have a GitHub URL')
  }

  if (!containsTeamInfo(project)) {
    alert('This project does not contain team_info')
    throw new Error('This project does not contain team_info')
  }

  if (!project.team_info) {
    alert('team_info is null')
    throw new Error('team_info is null')
  }

  if (project.team_info.length === 0) {
    alert('team_info is empty')
    throw new Error('team_info is empty')
  }
  return project
}

/**
 * Converts the project and author info into a defined format and copies it to the clipboard
 * @param authorModifier Conversion function for the author
 * @param projectAndAuthorTextModifier Conversion function for the project and author text
 */
async function copyAdminInfoToClipboard({ projectAndAuthorTextModifier: projectAndAuthorConversion, authorModifier: authorConversionFunction }:
{
  authorModifier: (user: any) => string
  projectAndAuthorTextModifier: (project: ProjectTable, authorText: string) => string
}) {
  const project = getProject()

  const authorTexts = project.team_info!.map(authorConversionFunction)
  let authorText: string
  if (authorTexts.length === 1)
    authorText = authorTexts[0]
  else
    authorText = `${authorTexts.slice(0, authorTexts.length - 1).join(', ')} and ${authorTexts[authorTexts.length - 1]}`

  const text = projectAndAuthorConversion(project, authorText)

  await navigator.clipboard.writeText(text)
  alert('Copied to clipboard')
}

async function copyAsMarkdown() {
  await copyAdminInfoToClipboard({
    authorModifier: user => `[@${user?.handler}](https://twitter.com/${user?.handler})`,
    projectAndAuthorTextModifier: (project, authorText) => `[${project.title}](${project.github_url}) - by ${authorText}`,
  })
}

async function copyForTweets() {
  await copyAdminInfoToClipboard({
    authorModifier: user => `@${user?.handler}`,
    projectAndAuthorTextModifier: (project, authorText) => `${project.title}: ${project.github_url} by ${authorText}`,
  })
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

    <div v-show="isAdmin" class="flex justify-end pt-4">
      <UTooltip text="Copy Product and author as Markdown">
        <UButton
          icon="i-lucide-copy"
          variant="ghost"
          color="gray"
          label="Copy for Tweets"
          @click="copyAsMarkdown"
        />
      </UTooltip>

      <UTooltip text="Copy Product and author for tweets">
        <UButton
          icon="i-lucide-copy"
          variant="ghost"
          color="gray"
          label="Copy as Markdown"
          @click="copyForTweets"
        />
      </UTooltip>
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
