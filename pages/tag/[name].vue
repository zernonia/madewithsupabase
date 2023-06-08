<script setup lang="ts">
import type { TagData } from '~~/script/interface'

const route = useRoute()
const name = computed(() => route.params.name.toString())
const { data: routeData } = await useLazyAsyncData<TagData[]>(name.value, () =>
  $fetch(`/api/tag?name=${name.value}`),
)
</script>

<template>
  <div>
    <CustomMeta
      :key="$route.params.name.toString()"
      :title="`Tag: ${$route.params.name}`"
    />

    <transition name="fade" mode="out-in">
      <div v-if="routeData" class="mt-12">
        <div v-if="routeData.length" class="card-grid">
          <Card v-for="item in routeData" :item="item" />
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
