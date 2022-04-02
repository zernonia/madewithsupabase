<template>
  <div>
    <CustomMeta :title="'Supabase Showcase | Made with Supabase'" />

    <div class="mt-8 flex flex-col items-center">
      <h1 class="text-3xl md:text-4xl text-center">Made with Supabase</h1>
    </div>

    <Banner></Banner>

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

    <Pagination :count="itemCount" :target="target"></Pagination>
  </div>
</template>

<script setup lang="ts">
const { $supabase } = useNuxtApp()

let itemCount = useState("item-count", () => 0)
const page = computed(() => +route.query.page)

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
        .range(page.value, page.value + 11),
    {
      transform: (a: any) => {
        itemCount.value = a.count
        return a.data
      },
    }
  ),
])
const target = ref()

const hero = computed(() => homeData.value?.[0].data)
const testimonial = computed(() => homeData.value?.[1].data)

const pending = ref(false)
const fetchLatest = async () => {
  pending.value = true
  const { data, error, count } = await $supabase
    .from("products_view")
    .select("*", { count: "exact" })
    .order("views", { ascending: false })
    .range(+page.value * 12, +page.value * 12 + (12 - 1))
  if (data) {
    latest.value = data
  }
  pending.value = false
}

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
