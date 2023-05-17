<script setup lang="ts">
import { useInfiniteScroll } from "@vueuse/core"

const { count, page, projects } = useInfinitePage("top-project")
const { upsertProjects } = useAllProjects()
const client = useSupabase()

const { pending, refresh } = useLazyAsyncData("top-projects", async () => {
  const { data, count: rowCount } = await client
    .from("products_view")
    .select("*", { count: "exact" })
    .order("views", { ascending: false })
    .range(page.value * 15, page.value * 15 + 14)

  if (data && page.value === 0) {
    count.value = rowCount ?? 0
  } 
  if (data) {
    projects.value = [...projects.value, ...data]
    upsertProjects(data)
  }
  return projects.value?.filter((i) => i.id)
})

definePageMeta({
  title: "New project",
})

const navLinks = [
  { path: "/", label: "Latest" },
  { path: "/top", label: "Top" },
]

const { el, bus } = useInfiniteBus()

function fetchNextPage() {
  if (pending.value) return
  page.value++
  refresh()
}

onMounted(() => [
  useInfiniteScroll(window, () => fetchNextPage(), { distance: 10 }),
])
</script>

<template>
  <div class="flex flex-col">
    <CustomMeta :title="'Supabase Showcase'" />

    <ol class="pl-0 flex items-center mt-6 sticky top-0 z-10">
      <li v-for="link in navLinks">
        <NuxtLink class="" :to="link.path">
          <div
            class="px-6 py-4 mr-4 border-b-2 border-transparent hover:border-white transition"
          >
            {{ link.label }}
          </div>
        </NuxtLink>
      </li>
    </ol>

    <div class="w-full mt-8 pb-20" v-if="projects">
      <div class="card-grid">
        <Card v-for="item in projects" :item="item"></Card>
      </div>

      <Loading :loading="pending"></Loading>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.router-link-active > div {
  @apply border-white;
}
</style>
