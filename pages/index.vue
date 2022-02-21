<template>
  <div ref="scrollComponent">
    <CustomMeta :title="'Home ⚡ Made with Supabase'" />

    <div class="mt-8 flex flex-col items-center">
      <h1 class="text-3xl md:text-4xl text-center">Made with Supabase</h1>
      <div class="mt-2 flex flex-col md:flex-row items-center">
        <GithubBanner class="my-1 md:my-0 md:mx-1"></GithubBanner>
        <a
          class=""
          rel="noopener"
          href="https://www.producthunt.com/posts/made-with-supabase?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-made-with-supabase"
          target="_blank"
          ><img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=313981&theme=light"
            alt="Made with Supabase - A collection of projects made with Supabase ⚡ | Product Hunt"
            style="width: 250px; height: 54px"
            width="250"
            height="54"
        /></a>
      </div>

      <div class="px-1 mt-12 h-36 md:h-52 w-full max-w-screen-lg rounded-lg">
        <div class="relative flex h-full w-full">
          <NuxtLink
            to="/holiday-hackdays"
            class="z-10 absolute w-full h-full flex justify-center items-center bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden"
          >
            <img class="w-full h-full object-cover" :src="HeroImage" alt="" />
          </NuxtLink>
          <div
            class="absolute w-full h-full bg-conic-gradient filter blur-xl"
          ></div>
          <div
            class="absolute w-full h-full bg-conic-gradient filter blur-3xl opacity-60 animate-pulse-slow"
          ></div>
          <div class="absolute -inset-1 rounded-lg bg-conic-gradient"></div>
        </div>
      </div>
    </div>

    <transition name="fade" mode="out-in">
      <div
        v-if="hero && hero.length && !heroPending"
        class="flex flex-col items-center"
      >
        <HeroSlider :data="hero"></HeroSlider>

        <div class="mt-16 sm:mt-24">
          <h1 class="text-4xl text-center mb-4 sm:mb-8">Testimonial</h1>
          <div class="card-grid">
            <div v-for="item in testimonial" :key="item.id">
              <Card :item="item"></Card>
            </div>
          </div>
        </div>

        <Divider class="my-16 !bg-dark-700"></Divider>

        <div>
          <h1 ref="target" class="text-4xl text-center mb-4 sm:mb-8">
            Most Viewed
          </h1>
          <transition name="fade" mode="out-in">
            <div v-if="!pending" class="card-grid">
              <div v-for="item in latest" :key="item.id">
                <Card :item="item"></Card>
              </div>
            </div>
            <div
              v-else
              class="w-full h-screen flex items-center justify-center"
            >
              <SVGCircle class="animate-ping"></SVGCircle>
            </div>
          </transition>
        </div>
      </div>
      <div v-else class="w-full h-screen flex items-center justify-center">
        <SVGCircle class="animate-ping"></SVGCircle>
      </div>
    </transition>

    <div class="mt-12 w-full flex space-x-2 items-center justify-center">
      <div>
        <NuxtLink
          v-if="page != 0"
          class="text-dark-300 hover:text-gray-300 rounded-lg transition ease-in-out"
          :to="{
            query: { page },
            params: {
              position: target?.offsetTop - 50,
            },
          }"
        >
          <i-mdi:menu-left class="w-8 h-8"></i-mdi:menu-left>
        </NuxtLink>
        <div v-else class="w-8 h-8"></div>
      </div>
      <div class="flex flex-wrap justify-center">
        <router-link
          class="border-4 border-dark-300 hover:border-gray-300 mr-2 mb-2 w-12 h-12 inline-flex items-center justify-center rounded-lg transition ease-in-out"
          :class="[page == i - 1 ? ' border-gray-300' : '']"
          v-for="i in maxPage"
          :to="{
            query: { page: i },
            params: {
              position: target?.offsetTop - 50,
            },
          }"
        >
          {{ i }}
        </router-link>
      </div>
      <div>
        <NuxtLink
          v-if="page != maxPage - 1"
          class="text-dark-300 hover:text-gray-300 rounded-lg transition ease-in-out"
          :to="{
            query: { page: page + 2 },
            params: {
              position: target?.offsetTop - 50,
            },
          }"
        >
          <i-mdi:menu-right class="w-8 h-8"></i-mdi:menu-right>
        </NuxtLink>
        <div v-else class="w-8 h-8"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  scrollToTop: true,
}
</script>

<script setup lang="ts">
import HeroImage from "@/assets/supabase-hackathon-v2.png"

const { $supabase } = useNuxtApp()

let itemCount = useState("item-count", () => 0)

const countPerPage = 12
const page = computed(() => (route.query.page ? +route.query.page - 1 : 0))
const maxPage = computed(() => Math.ceil(itemCount.value / countPerPage))

const route = useRoute()

const [
  { data: hero, pending: heroPending },
  { data: testimonial },
  { data: latest, pending },
] = await Promise.all([
  useAsyncData(
    "hero",
    () =>
      $supabase
        .from("products_view")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3),
    {
      transform: (a: any) => a.data,
    }
  ),

  useAsyncData(
    "testimonial",
    () =>
      $supabase
        .from("products_view")
        .select("*")
        .or(
          "id.eq.c7231413-02b5-4549-ad9f-130370609f97, id.eq.da351848-1264-4925-8ee9-8c87ae8e77da, id.eq.960edf58-5994-4825-9d85-82d83d122ade"
        ),
    {
      transform: (a: any) => a.data,
    }
  ),

  useAsyncData(
    "latest",
    () =>
      $supabase
        .from("products_view")
        .select("*", { count: "exact" })
        .order("views", { ascending: false })
        .range(
          page.value * countPerPage,
          page.value * countPerPage + (countPerPage - 1)
        ),
    {
      transform: (a: any) => {
        itemCount.value = a.count
        return a.data
      },
    }
  ),
])

const fetchLatest = async () => {
  const { data, error, count } = await $supabase
    .from("products_view")
    .select("*", { count: "exact" })
    .order("views", { ascending: false })
    .range(
      page.value * countPerPage,
      page.value * countPerPage + (countPerPage - 1)
    )
  if (data) {
    latest.value = data
  }
  pending.value = false
}

const target = ref()
watch(route, (n) => {
  if (n.name != "index") return
  pending.value = true
  fetchLatest()
})
</script>
