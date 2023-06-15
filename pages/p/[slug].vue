<script setup lang="ts">
import Logo404 from '@/assets/404.svg'

const { allProjects, upsertProjects } = useAllProjects()
const slug = useRoute().params.slug

// TYPE ERROR: default key causes the data type to have issue.
const { data, pending } = await useFetch(`/api/project/${slug}`, {
  key: `project-${slug}`,
  default: () => {
    return allProjects.value?.find(project => project.slug === slug)
  },
  lazy: true,
})

const { meta } = useRoute()

watch(
  data,
  () => {
    meta.title = data.value?.title
  },
  {
    immediate: true,
  },
)

const client = useSupabase()
const { data: relatedData, pending: relatedPending } = await useAsyncData(
  `project-${slug}-related`,
  async () => {
    const d = await client.rpc('get_related_products_v2', {
      product_slug: slug.toString(),
    })
    if (d.data) {
      upsertProjects(d.data)
      return d.data
    }
  },
  { server: false, lazy: true },
)

useSeoMeta({
  title: () => data.value?.title,
  description: () => `${data.value?.description?.replace(/<|>/gi, '').slice(0, 150)}...}`,
  // reactive example
  // ogImage: () => someData.value?.image
})

defineOgImageStatic({
  image: () => {
    const key = data.value?.image_keys?.[0]
    if (key)
      return client.storage.from('products').getPublicUrl(key.replace('products/', '')).data.publicUrl
    else return data.value?.images?.[0]
  },
})
</script>

<template>
  <div class="min-h-screen-md">
    <transition name="fade" mode="out-in">
      <div v-if="data" class="mt-4">
        <Product :data="data" />
        <div v-if="data.id" class="mt-16 md:mt-36">
          <h1 class="text-3xl text-left">
            Related Projects
          </h1>
          <div v-if="!relatedPending" class="mt-6 md:mt-12 card-grid">
            <Card
              v-for="item in relatedData"
              :key="item.id ?? ''"
              :item="item"
            />
          </div>
          <Loading :loading="relatedPending" />
        </div>

        <div v-else class="w-full flex flex-col space-y-8 items-center mt-32">
          <CustomMeta title="404 ⚡ Made with Supabase" />

          <img class="w-40" :src="Logo404">
          <h1 class="text-4xl">
            No project found...
          </h1>
          <button
            class="inline-flex items-center text-white hover:text-green-500 outline-none transition"
            @click="$router.push('/')"
          >
            <div class="i-mdi:menu-left mr-2 w-6 h-6" />
            Home
          </button>
        </div>
      </div>
      <div v-else class="w-full h-screen flex items-center justify-center">
        <CustomMeta title="Loading... ⚡ Made with Supabase" />
        <SVGCircle class="animate-ping" />
      </div>
    </transition>
  </div>
</template>
