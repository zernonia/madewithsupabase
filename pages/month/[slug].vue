<template>
  <div>
    <CustomMeta
      :key="$route.params.slug.toString()"
      :title="'Month: ' + $route.params.slug + ' | Made with Supabase'"
    />

    <transition name="fade" mode="out-in">
      <div v-if="routeData" class="mt-12">
        <div v-if="routeData.length" class="card-grid">
          <Card v-for="item in routeData" :item="item"></Card>
        </div>
        <div v-else class="w-full flex flex-col space-y-8 items-center mt-32">
          <img class="w-40" src="@/assets/404.svg" />
          <h1 class="text-4xl">No project found...</h1>
          <button
            @click="$router.push('/')"
            class="inline-flex items-center text-dark-50 hover:text-light-900 transition"
          >
            <i-mdi:menu-left class="mr-2 w-6 h-6"></i-mdi:menu-left> Home
          </button>
        </div>
      </div>
      <div v-else class="w-full h-screen flex items-center justify-center">
        <SVGCircle class="animate-ping"></SVGCircle>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
const { $supabase } = useNuxtApp()
const route = useRoute()
const month = computed(() => +route.params.slug)
const { data: routeData } = await useLazyAsyncData(
  `month-${month.value}`,
  async () => {
    const { data } = await $supabase
      .rpc("get_monthly", {
        month_number: month.value,
      })
      .order("views", { ascending: false })
    return data
  }
)
</script>
