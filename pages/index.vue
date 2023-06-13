<script setup lang="ts">
import { useInfiniteScroll } from '@vueuse/core'

const { count, page, projects } = useInfinitePage('latest-project')
const { upsertProjects } = useAllProjects()
const client = useSupabase()

const sortOptions = [
  { label: 'Latest', value: { key: 'created_at', ascending: false } },
  { label: 'Most Popular', value: { key: 'views', ascending: false } },
  { label: 'Alphabetically (A-Z)', value: { key: 'slug', ascending: true } },
  { label: 'Alphabetically (Z-A)', value: { key: 'slug', ascending: false } },
] as const

const selectedSort = useState('project-sort', () => sortOptions[0])

const COUNT_PER_PAGE = 30
const { pending, refresh } = useLazyAsyncData('projects', async () => {
  const { key, ascending } = selectedSort.value.value
  const { data, count: rowCount } = await client
    .from('products_view')
    .select('*', { count: 'exact' })
    .order(key, { ascending })
    .range(page.value * COUNT_PER_PAGE, page.value * COUNT_PER_PAGE + (COUNT_PER_PAGE - 1))

  if (data && page.value === 0)
    count.value = rowCount ?? 0

  if (data) {
    projects.value = [...projects.value, ...data]
    upsertProjects(data)
  }
  return projects.value?.filter(i => i.id)
})

function fetchNextPage() {
  if (pending.value)
    return
  page.value++
  refresh()
}

onMounted(() => {
  useInfiniteScroll(window, () => fetchNextPage(), { distance: 10 })
})

watch(selectedSort, () => {
  // when sorting option changed, reset all projects
  projects.value = []
  page.value = 0
  refresh()
})
</script>

<template>
  <div class="flex flex-col">
    <CustomMeta title="Supabase Showcase" />

    <NuxtLink
      to="/flutter-hackathon"
      class="mt-6 group h-80 sm:h-[24rem] lg:h-[32rem] w-full flex flex-col justify-center items-center transition-all duration-500 rounded-2xl relative border border-violet-950 hover:border-violet-800 overflow-hidden"
    >
      <img
        src="~~/assets/flutter-hackathon-winners.webp" alt="Supabase Flutter Hackathon Winners"
        class="w-full h-full object-cover transition duration-500 scale-100 group-hover:scale-[1.02]"
      >
    </NuxtLink>

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

    <div v-if="projects" class="card-grid mt-8 pb-20">
      <Card v-for="item in projects" :key="item.slug ?? ''" :item="item" />
    </div>

    <Loading :loading="pending" />
  </div>
</template>

<style scoped lang="postcss">
.router-link-active > div {
  @apply border-white;
}
</style>
