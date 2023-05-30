<script setup lang="ts">
const client = useSupabase()
const route = useRoute()

const target = ref()
const itemCount = useState('item-count', () => 0)
const page = computed(() => (route.query.page ? +route.query.page - 1 : 0))

const {
  data: latest,
  pending,
  refresh,
} = useLazyAsyncData(`latest-${page.value}`, async () => {
  const { data, count } = await client
    .from('products_view')
    .select('*', { count: 'exact' })
    .order('views', { ascending: false })
    .range(page.value * 12, page.value * 12 + 11)

  itemCount.value = count ?? 0
  return data?.filter(i => i.id)
})

watch(page, (n, o) => {
  if (!isNaN(n) && n !== o)
    refresh()
})
</script>

<template>
  <div>
    <h1 ref="target" class="text-4xl text-center mb-4 sm:mb-8">
      Showcase
    </h1>
    <div v-if="latest" class="h-full relative">
      <div class="card-grid">
        <div v-for="item in latest" :key="item.id?.toString()">
          <Card :item="item" />
        </div>
      </div>
      <transition name="fade" mode="out-in">
        <div
          v-if="pending"
          class="absolute top-0 left-0 w-full h-full flex justify-center bg-dark-900"
        >
          <SVGCircle class="mt-48 animate-ping" />
        </div>
      </transition>
    </div>

    <div v-else class="w-full h-screen flex items-center justify-center">
      <SVGCircle class="animate-ping" />
    </div>

    <Pagination :count="itemCount" :target="target" />
  </div>
</template>
