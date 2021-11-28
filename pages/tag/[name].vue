<template>
  <div>
    <CustomMeta :key="$route.params.name" :title="'Tag: ' + $route.params.name + ' ⚡ Made with Supabase'" />

    <transition name="fade" mode="out-in">
      <div v-if="!isLoading" class="mt-12">
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

onMounted(() => {
  window.scrollTo({ top: 0, behavior: "smooth" })
})

const route = useRoute()
const routeData = ref<any>([])
const isLoading = ref(true)
const fetchData = async () => {
  let name = route.params.name as string
  if (name.toLowerCase().startsWith("supabase")) {
    const { data, error, count } = await $supabase
      .rpc(
        "get_supabase_tags",
        {
          tag: route.params.name,
        },
        {
          count: "exact",
        }
      )
      .order("views", { ascending: false })
    routeData.value = data
  } else {
    const { data, error, count } = await $supabase
      .rpc(
        "get_tags",
        {
          tag: route.params.name,
        },
        {
          count: "exact",
        }
      )
      .order("views", { ascending: false })
    routeData.value = data
  }
  isLoading.value = false
}

fetchData()
</script>
