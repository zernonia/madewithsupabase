<template>
  <div>
    <CustomMeta :title="'Supabase Showcase | Made with Supabase'" />

    <div class="mt-8 flex flex-col items-center">
      <h1 class="text-3xl md:text-4xl text-center">Made with Supabase</h1>
    </div>

    <transition name="fade" mode="out-in">
      <div v-if="hero && hero.length" class="flex flex-col items-center">
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
          <div v-if="latest" class="h-full relative">
            <div class="card-grid">
              <div v-for="item in latest" :key="item.id">
                <Card :item="item"></Card>
              </div>
            </div>
            <transition name="fade" mode="out-in">
              <div
                v-if="pending"
                class="absolute top-0 left-0 w-full h-full flex justify-center bg-dark-900"
              >
                <SVGCircle class="mt-48 animate-ping"></SVGCircle>
              </div>
            </transition>
          </div>
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
            params: nuxtLinkParams,
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
            params: nuxtLinkParams,
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
            params: nuxtLinkParams,
          }"
        >
          <i-mdi:menu-right class="w-8 h-8"></i-mdi:menu-right>
        </NuxtLink>
        <div v-else class="w-8 h-8"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeroImage from "@/assets/supabase-hackathon-v2.png"

const { $supabase } = useNuxtApp()

let itemCount = useState("item-count", () => 0)

const countPerPage = 12
const page = computed(() => (route.query.page ? +route.query.page - 1 : 0))
const maxPage = computed(() => Math.ceil(itemCount.value / countPerPage))

const route = useRoute()

const [{ data: homeData }, { data: latest }] = await Promise.all([
  useLazyAsyncData("hero testimonial", () => $fetch("/api/project/home")),

  useLazyAsyncData(
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

const hero = computed(() => homeData.value?.[0].data)
const testimonial = computed(() => homeData.value?.[1].data)

const pending = ref(false)
const fetchLatest = async () => {
  pending.value = true
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

const nuxtLinkParams = computed(() => ({
  position: target.value?.offsetTop - 50,
}))

watch(
  () => route.query,
  (n) => {
    if (route.query.page) fetchLatest()
  }
)

definePageMeta({
  pageTransition: {
    name: "fade",
    mode: "out-in",
  },
})
</script>
