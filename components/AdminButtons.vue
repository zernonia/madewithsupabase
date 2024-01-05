<!-- eslint-disable no-alert -->
<script setup lang="ts">
import type { Project, ProjectTable } from '~/types'

const props = defineProps<{
  data: Project
}>()

function containsTeamInfo(project: Project): project is ProjectTable {
  return Object.keys(project).includes('team_info')
}

function getProject(): ProjectTable {
  const project = props.data

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
</script>

<template>
  <div class="flex justify-end pt-4">
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
</template>
