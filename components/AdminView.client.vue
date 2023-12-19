<script setup lang="ts">
import { json2csv } from 'json-2-csv'
import type { Project } from '~/types'

const { upsertProjects } = useAllProjects()

const hackathon = ref('Launch Week X')
const hackathonOptions = [
  'Launch Week X',
  'Launch Week 8',
  'Flutter Hackathon',
  'Launch Week 7',
]

const { data, pending } = useLazyAsyncData(hackathon.value, async () => {
  const data = await $fetch<Project[]>('/api/admin/hackathon', {
    method: 'POST',
    body: {
      hackathon: hackathon.value,
    },
  })
  upsertProjects(data)
  return data
}, {
  watch: [hackathon],
})

async function downloadCSV() {
  if (!data.value)
    return

  const csv = json2csv(data.value)
  const csvContent = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`
  const link = document.createElement('a')
  link.href = csvContent
  link.download = hackathon.value
  link.click()
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center mt-4">
      <div class="flex items-center">
        <div class="mr-2 text-sm">
          Hackathon:
        </div>
        <USelectMenu v-model="hackathon" :options="hackathonOptions" />
      </div>

      <div>
        <UButton :disabled="!data?.length || pending" @click="downloadCSV">
          Download CSV ({{ data?.length ?? '-' }})
        </UButton>
      </div>
    </div>

    <div class="mt-6">
      <Loading v-if="pending" :loading="pending" />
      <div v-else-if="data?.length" class=" card-grid">
        <Card v-for="item in data" :key="item.id!" :item="item" />
      </div>
    </div>
  </div>
</template>
