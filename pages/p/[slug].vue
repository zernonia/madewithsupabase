<script setup lang="ts">
import Logo404 from "@/assets/404.svg"
import { Projects } from "~~/database.types"

const slug = useRoute().params.slug

// Access to the cached value of useFetch in archive.vue
const { data: projects } = useNuxtData<Projects>("projects")
const { data, pending } = await useFetch(`/api/project/${slug}`, {
  key: `project-${slug}`,
  default: () => {
    return projects.value?.find((project) => project.slug === slug)
  },
  lazy: true,
})

const tweetLink = computed(() => {
  const href = "https://madewithsupabase.com" + useRoute().fullPath
  if (!data.value) return
  return `https://twitter.com/intent/tweet?original_referer=${href}&text=Check out ${
    data.value.title
  } ${data.value.twitter ? "by @" + data.value.twitter : ""}&url=${href}`
})

const computedUrl = computed(() => {
  let url = new URL(data.value?.url ?? "")
  url.searchParams.set("ref", "madewithsupabase")
  return url.href
})

definePageMeta({
  pageTransition: {
    name: "fade",
    mode: "out-in",
  },
})

const { meta } = useRoute()
watch(data, () => (meta.title = data.value?.title), {
  immediate: true,
})
</script>

<template>
  <div class="min-h-screen-md">
    <!-- <CustomMeta
      :key="data?.title ?? ''"
      :title="data?.title"
      :description="
        data?.description?.replace(/<|>/gi, '').slice(0, 150) + '...'
      "
      :image="'https://madewithsupabase.com/og/' + data?.slug"
    /> -->

    <transition name="fade" mode="out-in">
      <div class="mt-4" v-if="data || !pending">
        <div v-if="data && data.id">
          <!-- <div class="w-full flex items-center justify-between">
            <button
              @click="$router.back()"
              class="inline-flex items-center text-dark-50 hover:text-light-900 transition"
            >
              <div class="i-mdi:menu-left mr-2 w-6 h-6"></div>
              Back
            </button>
            <button
              @click="$router.push(`/edit/${slug}`)"
              class="inline-flex items-center text-dark-50 hover:text-light-900 transition"
            >
              <div class="i-mdi:square-edit-outline mr-2 w-6 h-6"></div>
              Edit
            </button>
          </div> -->
          <div class="flex justify-end items-center">
            <a
              :href="tweetLink"
              target="_blank"
              rel="noopener"
              class="px-6 rounded-xl flex space-x-4"
            >
              <div class="i-mdi:twitter w-7 h-7"></div>
            </a>
            <a
              :href="computedUrl"
              target="_blank"
              rel="noopener"
              class="btn mr-4 inline-flex items-center"
              >Visit Website
              <div class="i-ic:twotone-ads-click ml-2"></div>
            </a>
          </div>

          <MySlider
            class="max-w-screen-lg"
            :images="data.images ?? []"
          ></MySlider>

          <div class="mt-12 flex flex-col md:flex-row justify-between relative">
            <div
              class="w-full mx-auto p-4 md:p-8 flex z-10 flex-col space-y-16"
            >
              <div>
                <div class="i-mdi:information-outline w-8 h-8"></div>
                <h2 class="text-3xl mb-2">Description</h2>
                <Marked :text="data.description?.replace(/<|>/gi, '')"></Marked>
              </div>

              <div>
                <div class="i-mdi:lightning-bolt w-8 h-8"></div>
                <h2 class="text-3xl mb-2">Supabase Features</h2>
                <div class="prose">
                  <ul
                    v-if="
                      !data.supabase_features || !data.supabase_features.length
                    "
                  >
                    <li class="text-light-900">Unknown</li>
                  </ul>
                  <ul v-else class="text-light-900">
                    <li v-for="feature in data.supabase_features">
                      {{ feature }}
                    </li>
                  </ul>
                </div>
              </div>

              <div class="flex flex-wrap items-center mt-2">
                <div
                  class="text-sm rounded-md bg-dark-400 mr-2 mb-2"
                  v-for="category in data.categories"
                >
                  <router-link :to="'/tag/' + category">
                    <p class="px-4 py-2"># {{ category }}</p>
                  </router-link>
                </div>
              </div>
            </div>

            <!-- <div class="w-full md:w-1/3 h-min mt-6 md:mt-0 md:ml-8">
              <div
                class="p-8 bg-gradient-to-tr from-emerald-600 to-emerald-400 rounded-xl"
              >
                <div class="i-mdi:circle-multiple-outline w-8 h-8"></div>
                <h2 class="text-3xl mb-2">Maker</h2>
                <div class="flex flex-col space-y-1">
                  <a
                    v-if="data.github_url"
                    :href="data.github_url"
                    target="_blank"
                    rel="noopener"
                    class="inline-flex items-center hover:underline underline-offset-1"
                    ><div class="i-mdi:github mr-2"></div>
                    {{ data.github_url.split(".com/")[1] }}</a
                  >
                  <a
                    v-if="data.twitter"
                    :href="'https://twitter.com/' + data.twitter"
                    target="_blank"
                    rel="noopener"
                    class="inline-flex items-center hover:underline underline-offset-1"
                    ><div class="i-mdi:twitter mr-2"></div>
                    {{ data.twitter }}</a
                  >
                  <a
                    v-if="data.instagram"
                    :href="'https://instagram.com/' + data.instagram"
                    target="_blank"
                    rel="noopener"
                    class="inline-flex items-center hover:underline underline-offset-1"
                    ><div class="i-mdi:instagram mr-2"></div>
                    {{ data.instagram }}</a
                  >
                </div>
              </div>
            </div> -->
          </div>

          <!-- <Divider class="my-12 !bg-dark-600"></Divider> -->

          <!-- <div ref="related" class="">
            <h1 class="text-3xl text-center">Related Projects</h1>
            <div class="mt-12 card-grid">
              <Card v-for="item in relatedData" :item="item"></Card>
            </div>
          </div> -->
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
