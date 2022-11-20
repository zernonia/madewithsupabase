<template>
  <div>
    <CustomMeta :title="'Supabase Showcase | Made with Supabase'" />

    <div class="mt-8 flex flex-col items-center">
      <h1 class="text-3xl md:text-4xl text-center">Made with Supabase</h1>
    </div>

    <!-- <Banner></Banner> -->

    <transition name="fade" mode="out-in">
      <div v-if="hero && hero.length" class="flex flex-col items-center">
        <HeroSlider :data="hero"></HeroSlider>

        <div class="mt-16 sm:mt-24">
          <h1 class="text-4xl text-center mb-4 sm:mb-8">Testimonial</h1>
          <div class="card-grid">
            <div v-for="item in testimonial" :key="item.id?.toString()">
              <Card :item="item"></Card>
            </div>
          </div>
        </div>

        <Divider class="my-16 !bg-dark-700"></Divider>
      </div>
    </transition>

    <HomePagination></HomePagination>
  </div>
</template>

<script setup lang="ts">
const client = useSupabase()

const route = useRoute()

const { data: homeData } = await useLazyAsyncData("hero testimonial", () =>
  $fetch("/api/project/home")
)

const hero = computed(() => homeData.value?.[0].data)
const testimonial = computed(() => homeData.value?.[1].data)

definePageMeta({
  pageTransition: {
    name: "fade",
    mode: "out-in",
  },
})
</script>
