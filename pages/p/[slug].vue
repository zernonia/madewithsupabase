<script setup lang="ts">
import Logo404 from '@/assets/404.svg'

const { allProjects, upsertProjects } = useAllProjects()
const slug = useRoute().params.slug

const { data, pending } = await useFetch(`/api/project/${slug}`, {
  key: `project-${slug}`,
  default: () => {
    return allProjects.value?.find(project => project.slug === slug)
  },
  lazy: true,
})

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

const { meta } = useRoute()
const {
  options: { history },
} = useRouter()
watch(
  data,
  () => {
    meta.title = data.value?.title
    if (history.state.back)
      meta.back = true
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

onMounted(() => {
  $fetch(`/api/view/${slug}`)
})
</script>

<template>
  <div class="min-h-screen-md">
    <CustomMeta
      :key="data?.title ?? ''"
      :title="data?.title ?? ''"
      :description="
        `${data?.description?.replace(/<|>/gi, '').slice(0, 150)}...`
      "
      :image="`https://madewithsupabase.com/og/${data?.slug}`"
    />

    <transition name="fade" mode="out-in">
      <div v-if="data || !pending" class="mt-4">
        <div v-if="data && data.id">
          <div
            class="flex flex-col md:flex-row justify-between md:items-center"
          >
            <SupabaseFeatures
              :features="data.supabase_features"
            />

            <div class="flex items-center gap-4 mt-4 justify-end">
              <!-- <a :href="tweetLink" target="_blank" rel="noopener">
              </a> -->

              <LegoSocialShare class="text-3xl flex space-x-3">
                <LegoSocialShareTwitter
                  class="text-white hover:text-gray-100 transition"
                  :text="tweetText"
                >
                  <div class="i-mdi-share-variant w-7 h-7" />
                </LegoSocialShareTwitter>
              </LegoSocialShare>

              <a
                v-if="data.twitter"
                :href="`https://twitter.com/${data.twitter}`"
                target="_blank"
                rel="noopener"
              ><div class="i-mdi:twitter w-7 h-7" />
              </a>
              <a
                v-if="data.github_url"
                :href="data.github_url"
                target="_blank"
                rel="noopener"
              ><div class="i-mdi:github w-7 h-7" />
              </a>
              <a
                :href="computedUrl"
                target="_blank"
                rel="noopener"
                class="btn mr-4 inline-flex items-center"
              >Visit Website
                <div class="i-ic:twotone-ads-click ml-2" />
              </a>
            </div>
          </div>

          <div
            v-if="data.images?.length"
            class="mt-6 bg-dark-900 bg-opacity-20 py-6 rounded-3xl"
          >
            <MySlider :images="data.images ?? []" />
          </div>

          <div class="mt-6 md:mt-12 w-full flex flex-col">
            <Marked
              class="max-w-none"
              :text="data.description?.replace(/<|>/gi, '')"
            />

            <div class="flex flex-wrap items-center mt-8">
              <div
                v-for="category in data.categories"
                class="text-sm rounded-md bg-dark-400 mr-2 mb-2"
              >
                <router-link :to="`/tag/${category}`">
                  <p class="px-4 py-2">
                    # {{ category }}
                  </p>
                </router-link>
              </div>
            </div>
          </div>

          <div class="mt-16 md:mt-36">
            <h1 class="text-3xl text-left">
              Related Projects
            </h1>
            <div v-if="!relatedPending" class="mt-6 md:mt-12 card-grid">
              <Card v-for="item in relatedData" :item="item" />
            </div>
            <Loading :loading="relatedPending" />
          </div>
        </div>
        <div v-else class="w-full flex flex-col space-y-8 items-center mt-32">
          <CustomMeta title="404 ⚡ Made with Supabase" />

          <img class="w-40" :src="Logo404">
          <h1 class="text-4xl">
            No project found...
          </h1>
          <button
            class="inline-flex items-center text-light-900 hover:text-green-500 outline-none transition"
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
