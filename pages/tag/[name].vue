<script setup lang="ts">
const { upsertProjects } = useAllProjects()
const route = useRoute()
const name = computed(() => route.params.name.toString())
const { data } = await useLazyAsyncData(name.value, async () => {
  const data = await $fetch(`/api/tag?name=${name.value}`)
  upsertProjects(data)
  return data
},
)
</script>

<template>
  <div>
    <CustomMeta
      :key="$route.params.name.toString()"
      :title="`Tag: ${$route.params.name}`"
    />

    <transition name="fade" mode="out-in">
      <div v-if="data" class="mt-6">
        <div v-if="data.length" class="card-grid">
          <Card v-for="item in data" :key="item.id ?? ''" :item="item" />
        </div>
        <div v-else class="w-full flex flex-col space-y-8 items-center mt-32">
          <img class="w-40" src="@/assets/404.svg">
          <h1 class="text-4xl">
            No project found...
          </h1>
          <button
            class="inline-flex items-center text-gray-50 hover:text-white transition"
            @click="$router.push('/')"
          >
            <div class="i-mdi:menu-left mr-2 w-6 h-6" />
            Home
          </button>
        </div>
      </div>
      <div v-else class="w-full h-screen flex items-center justify-center">
        <SVGCircle class="animate-ping" />
      </div>
    </transition>
  </div>
</template>
