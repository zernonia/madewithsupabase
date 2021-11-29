<template>
  <div ref="scrollComponent">
    <CustomMeta :title="'Home ⚡ Made with Supabase'" />

    <div class="mt-16 flex flex-col items-center">
      <h1 class="text-3xl md:text-4xl text-center">Made with Supabase</h1>
      <a
        rel="noopener"
        class="mt-2"
        href="https://www.producthunt.com/posts/made-with-supabase?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-made-with-supabase"
        target="_blank"
        ><img
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=313981&theme=light"
          alt="Made with Supabase - A collection of projects made with Supabase ⚡ | Product Hunt"
          style="width: 250px; height: 54px"
          width="250"
          height="54"
      /></a>
      <NuxtLink
        class="
          relative
          overflow-hidden
          mt-4
          p-8
          w-full
          max-w-screen-lg
          md:h-48
          flex flex-col
          md:flex-row
          items-center
          justify-center
          md:justify-between
          bg-gradient-to-tr
          from-emerald-600
          to-emerald-300
          rounded-lg
          group
        "
        to="/hacktoberfest"
        id="hacktober"
      >
        <div
          class="
            absolute
            h-100
            w-72
            -top-52
            -left-60
            group-hover:-left-50
            transition-all
            bg-emerald-800
            opacity-70
            transform
            -rotate-40
          "
        ></div>
        <div
          class="
            absolute
            h-100
            w-72
            -top-32
            -left-50
            group-hover:-left-60
            transition-all
            bg-emerald-600
            opacity-70
            transform
            -rotate-40
          "
        ></div>
        <div
          class="
            absolute
            h-100
            w-72
            -top-120
            left-80
            group-hover:-top-100
            transition-all
            bg-emerald-200
            opacity-70
            transform
            -rotate-40
          "
        ></div>
        <div
          class="
            absolute
            h-56
            w-72
            -bottom-32
            group-hover:-bottom-22
            -right-36
            group-hover:-right-26
            transition-all
            bg-emerald-800
            opacity-70
            transform
            -rotate-45
          "
        ></div>
        <div class="relative">
          <h1 class="text-4xl sm:text-5xl md:text-6xl">Hacktoberfest</h1>
        </div>
        <button class="relative px-6 py-3 mt-2 md:mt-0 rounded-lg bg-white text-emerald-600">Announcement 🥇</button>
      </NuxtLink>
    </div>

    <transition name="fade" mode="out-in">
      <div v-if="hero && hero.length && !heroPending" class="flex flex-col items-center">
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
          <h1 ref="target" class="text-4xl text-center mb-4 sm:mb-8">Most Viewed</h1>
          <transition name="fade" mode="out-in">
            <div v-if="!pending" class="card-grid">
              <div v-for="item in latest" :key="item.id">
                <Card :item="item"></Card>
              </div>
            </div>
            <div v-else class="w-full h-screen flex items-center justify-center">
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
          v-if="$route.query.page && +($route.query.page as string) != 1"
          class="text-dark-300 hover:text-gray-300 rounded-lg transition ease-in-out"
          :to="{
          query: { page: +($route.query.page as string) -1 },
          params: {
            savePosition: true,
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
          class="
            border-4 border-dark-300
            hover:border-gray-300
            mr-2
            mb-2
            w-12
            h-12
            inline-flex
            items-center
            justify-center
            rounded-lg
            transition
            ease-in-out
          "
          :class="[page == i - 1 ? ' border-gray-300' : '']"
          v-for="i in maxPage"
          :to="{
            query: { page: i },
            params: {
              savePosition: true,
              position: target?.offsetTop - 50,
            },
          }"
        >
          {{ i }}
        </router-link>
      </div>
      <div>
        <NuxtLink
          v-if="+($route.query.page as string) != maxPage"
          class="text-dark-300 hover:text-gray-300 rounded-lg transition ease-in-out"
          :to="{
          query: { page: +($route.query.page as string) + 1 },
          params: {
            savePosition: true,
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
// import { supabase } from "@/script/supabase"
const { $supabase } = useNuxtApp()

let itemCount = useState("item-count", () => 0)

const countPerPage = 12
const page = computed(() => (route.query.page ? +route.query.page - 1 : 0))
const maxPage = computed(() => Math.ceil(itemCount.value / countPerPage))

const route = useRoute()
const { data: hero, pending: heroPending } = await useAsyncData(
  "hero",
  () => $supabase.from("products_view").select("*").order("created_at", { ascending: false }).limit(3),
  {
    transform: (a: any) => a.data,
  }
)

const { data: testimonial } = await useAsyncData(
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
)

const { data: latest, pending } = await useAsyncData(
  "latest",
  () =>
    $supabase
      .from("products_view")
      .select("*", { count: "exact" })
      .order("views", { ascending: false })
      .range(page.value * countPerPage, page.value * countPerPage + (countPerPage - 1)),
  {
    transform: (a: any) => {
      itemCount.value = a.count
      return a.data
    },
  }
)

const fetchLatest = async () => {
  const { data, error, count } = await $supabase
    .from("products_view")
    .select("*", { count: "exact" })
    .order("views", { ascending: false })
    .range(page.value * countPerPage, page.value * countPerPage + (countPerPage - 1))
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
