<template>
  <div class="min-h-screen-md">
    <CustomMeta
      :key="routeData?.title"
      :title="routeData?.title + ' | Made with Supabase'"
      :description="
        routeData?.description.replace(/<|>/gi, '').slice(0, 150) + '...'
      "
      :image="'https://madewithsupabase.com/api/og?slug=' + routeData?.slug"
    />
    <transition name="fade" mode="out-in">
      <div class="mt-4" v-if="routeData || !pending">
        <div v-if="routeData && routeData.id">
          <div class="w-full flex items-center justify-between">
            <button
              @click="$router.back()"
              class="inline-flex items-center text-dark-50 hover:text-light-900 transition"
            >
              <div class="i-mdi:menu-left mr-2 w-6 h-6"></div>
              Back
            </button>
            <button
              @click="$router.push(`/edit/${name}`)"
              class="inline-flex items-center text-dark-50 hover:text-light-900 transition"
            >
              <div class="i-mdi:square-edit-outline mr-2 w-6 h-6"></div>
              Edit
            </button>
          </div>

          <MySlider
            class="max-w-screen-lg"
            :images="routeData.images"
          ></MySlider>

          <div class="mt-8 flex flex-col items-center justify-center">
            <h1 class="text-center text-4xl">{{ routeData.title }}</h1>
            <a
              :href="computedUrl"
              target="_blank"
              rel="noopener"
              class="btn mt-2 inline-flex items-center"
              >Visit Website
              <div class="i-ic:twotone-ads-click ml-2"></div>
            </a>
          </div>
          <div class="mt-12 flex flex-col md:flex-row justify-between relative">
            <SVGCircle class="absolute -top-10 -left-10 z-0"></SVGCircle>
            <div
              class="w-full md:w-2/3 p-4 md:p-8 flex z-10 flex-col space-y-16 rounded-xl border-5 border-dark-300 bg-dark-600"
            >
              <div>
                <div class="i-mdi:information-outline w-8 h-8"></div>
                <h2 class="text-3xl mb-2">Description</h2>
                <Marked
                  :text="routeData.description.replace(/<|>/gi, '')"
                ></Marked>
              </div>

              <div>
                <div class="i-mdi:lightning-bolt w-8 h-8"></div>
                <h2 class="text-3xl mb-2">Supabase Features</h2>
                <div class="prose">
                  <ul
                    v-if="
                      !routeData.supabase_features ||
                      !routeData.supabase_features.length
                    "
                  >
                    <li class="text-light-900">Unknown</li>
                  </ul>
                  <ul v-else class="text-light-900">
                    <li v-for="feature in routeData.supabase_features">
                      {{ feature }}
                    </li>
                  </ul>
                </div>
              </div>

              <div class="flex flex-wrap items-center mt-2">
                <div
                  class="text-sm rounded-md bg-dark-400 mr-2 mb-2"
                  v-for="category in routeData.categories"
                >
                  <router-link :to="'/tag/' + category">
                    <p class="px-4 py-2"># {{ category }}</p>
                  </router-link>
                </div>
              </div>
            </div>

            <div class="w-full md:w-1/3 h-min mt-6 md:mt-0 md:ml-8">
              <div
                class="p-8 bg-gradient-to-tr from-green-600 to-emerald-400 rounded-xl"
              >
                <div class="i-mdi:circle-multiple-outline w-8 h-8"></div>
                <h2 class="text-3xl mb-2">Maker</h2>
                <div class="flex flex-col space-y-1">
                  <a
                    v-if="routeData.github_url"
                    :href="routeData.github_url"
                    target="_blank"
                    rel="noopener"
                    class="inline-flex items-center hover:underline underline-offset-1"
                    ><div class="i-mdi:github mr-2"></div>
                    {{ routeData.github_url.split(".com/")[1] }}</a
                  >
                  <a
                    v-if="routeData.twitter"
                    :href="'https://twitter.com/' + routeData.twitter"
                    target="_blank"
                    rel="noopener"
                    class="inline-flex items-center hover:underline underline-offset-1"
                    ><div class="i-mdi:twitter mr-2"></div>
                    {{ routeData.twitter }}</a
                  >
                  <a
                    v-if="routeData.instagram"
                    :href="'https://instagram.com/' + routeData.instagram"
                    target="_blank"
                    rel="noopener"
                    class="inline-flex items-center hover:underline underline-offset-1"
                    ><div class="i-mdi:instagram mr-2"></div>
                    {{ routeData.instagram }}</a
                  >
                </div>
              </div>

              <a
                :href="tweetLink"
                target="_blank"
                rel="noopener"
                class="px-6 mt-6 rounded-xl flex space-x-4"
              >
                <div class="i-mdi:twitter w-7 h-7"></div>
                <h2 class="text-2xl">Tweet it!</h2>
              </a>
            </div>
          </div>

          <Divider class="my-12 !bg-dark-600"></Divider>

          <div ref="related" class="">
            <h1 class="text-3xl text-center">Related Projects</h1>
            <div class="mt-12 card-grid">
              <Card v-for="item in relatedData" :item="item"></Card>
            </div>
          </div>
        </div>
        <div v-else class="w-full flex flex-col space-y-8 items-center mt-32">
          <CustomMeta title="404 ⚡ Made with Supabase" />

          <img class="w-40" :src="Logo404" />
          <h1 class="text-4xl">No project found...</h1>
          <button
            @click="$router.push('/')"
            class="inline-flex items-center text-dark-50 hover:text-light-900 transition"
          >
            <div class="i-mdi:menu-left mr-2 w-6 h-6"></div>
            Home
          </button>
        </div>
      </div>
      <div v-else class="w-full h-screen flex items-center justify-center">
        <CustomMeta title="Loading... ⚡ Made with Supabase" />
        <SVGCircle class="animate-ping"></SVGCircle>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import Logo404 from "@/assets/404.svg"
import { ProductData } from "@/script/interface"
const { $supabase } = useNuxtApp()
const notFound = ref(false)
const route = useRoute()

const name = computed(() => route.params.name)
const { data: routeData, pending } = await useLazyAsyncData<ProductData>(
  `project-${name.value}`,
  () => $fetch(`/api/project?name=${name.value}`)
)

const related = ref(null)
const relatedData = ref<any[]>([])
const fetchRelated = async () => {
  if (process.client && routeData.value) {
    const { data, error } = await $supabase
      .rpc("get_related_products", {
        parent_id: routeData.value.id,
      })
      .limit(6)
    relatedData.value = data as any[]

    error ? (notFound.value = true) : (notFound.value = false)
  }
}

const viewProduct = () => {
  $fetch(`/api/view?name=${name.value}`)
}

onMounted(() => {
  viewProduct()
  fetchRelated()
})

const tweetLink = computed(() => {
  const href = "https://madewithsupabase.com" + route.fullPath
  return `https://twitter.com/intent/tweet?original_referer=${href}&text=Check out ${
    routeData.value.title
  } ${
    routeData.value.twitter ? "by @" + routeData.value.twitter : ""
  }&url=${href}`
})

const computedUrl = computed(() => {
  let url = new URL(routeData.value.url)
  url.searchParams.set("ref", "madewithsupabase")
  return url.href
})

definePageMeta({
  pageTransition: {
    name: "fade",
    mode: "out-in",
  },
})
</script>
