<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const { params } = toRefs(useRoute())
const client = useSupabase()
const supabaseTags = [
  'Supabase Auth',
  'Supabase Database',
  'Supabase Function',
  'Supabase Storage',
  'Supabase Realtime',
]
const selected = ref(params.value.name)

const { data: tags } = await useLazyAsyncData('tags', async () => {
  const { data } = await client.from('tags_view').select('*').order('tags', { ascending: true })
  return data?.map(i => i.tags ?? '')
}, { watch: [selected] })

const options = computed(() => [...supabaseTags, ...(tags.value ?? [])])

watch(() => params.value.name, (n) => {
  selected.value = n
})

// const { data: projects } = await useLazyAsyncData('accounts-project', async () => {
//   const { key, ascending } = selectedSort.value.value
//   const { data } = await client.from('products').select('*').eq('email', email.value).order(key, { ascending })
//   return data
// }, { server: false, watch: [selectedSort] })
</script>

<template>
  <div class="mt-6">
    <div class="flex items-center">
      <div class="mr-2 text-sm">
        Tag:
      </div>
      <USelectMenu
        v-model="selected"
        :options="options"
        class="w-56"
        placeholder="Select tag"
        leading-icon="i-lucide-tag"
        @update:model-value="navigateTo(`/tag/${$event}`)"
      />
    </div>

    <NuxtPage />
  </div>
</template>
