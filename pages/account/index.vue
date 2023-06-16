<script setup lang="ts">
const user = useSupabaseUser()
const client = useSupabase()
const { upsertProjects } = useAllProjects()
const email = computed(() => user.value?.email)

const sortOptions = [
  { label: 'Latest', value: { key: 'created_at', ascending: false } },
  { label: 'Most Popular', value: { key: 'views', ascending: false } },
  { label: 'Alphabetically (A-Z)', value: { key: 'slug', ascending: true } },
  { label: 'Alphabetically (Z-A)', value: { key: 'slug', ascending: false } },
] as const

const selectedSort = useState('account-sort', () => sortOptions[0])

const { data: projects, pending } = await useLazyAsyncData('account-project', async () => {
  const { key, ascending } = selectedSort.value.value
  const { data } = await client.from('products').select('*').eq('email', email.value).order(key, { ascending })
  if (data)
    upsertProjects(data)
  return data
}, { server: false, watch: [selectedSort] })

definePageMeta({
  title: 'Your Project',
})
</script>

<template>
  <div>
    <div class="flex justify-center mt-4">
      <UButton color="black" variant="solid" size="md" to="/submission" label="Submit your project" />
    </div>

    <div class="mt-12 flex items-center">
      <div class="mr-2 text-sm">
        Sort:
      </div>
      <USelectMenu v-model="selectedSort" :disabled="pending" class="w-56" :options="sortOptions">
        <template #label>
          <UIcon name="i-lucide-arrow-up-down" />
          <span v-if="selectedSort" class="truncate">{{ selectedSort.label }}</span>
          <span v-else>Sorting</span>
        </template>
      </USelectMenu>
    </div>
    <div class="card-grid mt-6">
      <div
        v-for="item in projects" :key="item.slug ?? ''"
        class="relative group"
      >
        <CardOptions :item="item" />
        <Card :item="item" />
      </div>
    </div>

    <Loading :loading="pending" />
  </div>
</template>
