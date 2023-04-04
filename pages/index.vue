<script setup lang="ts">
import type { Projects } from "@/database.types"
import { useInfiniteScroll } from "@vueuse/core"

const client = useSupabase()

const itemCount = useState("latest-item-count", () => 0)
const page = useState("latest-item-page", () => 0)
const projects = useState<Projects>("latest-item-data", () => [])

const { pending, refresh } = useLazyAsyncData("projects", async () => {
  const { data, count } = await client
    .from("products_view")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(page.value * 15, page.value * 15 + 14)

  if (data && page.value === 0) {
    itemCount.value = count ?? 0
    // @ts-ignore
    projects.value = data.splice(9, 0, { title: "PROMO" })
  }
  if (data) {
    projects.value = [...projects.value, ...data]
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
      <div class="grid md:grid-cols-2 xl:grid-cols-3 lg:gap-6 xl:gap-10">
        <div v-for="item in projects">
          <div v-if="item.title === 'PROMO'">hi</div>
          <Card v-else :item="item"></Card>
        </div>
      </div>
      <!-- <MasonryWall
        :items="projects"
        :ssr-columns="2"
        :column-width="300"
        :gap="28"
        :scroll-container="el"
      >
        <template #default="{ item, index }">
          <div v-if="item.title === 'PROMO'">hi</div>
          <Card v-else :item="item"></Card>
        </template>
      </MasonryWall>
      -->
      <Loading :loading="pending"></Loading>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.router-link-active > div {
  @apply border-white;
}
</style>
