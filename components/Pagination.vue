<script setup lang="ts">
import { PropType } from "vue"

const route = useRoute()

const props = defineProps({
  count: Number,
  target: Object as PropType<HTMLElement>,
})

const emit = defineEmits<{
  (e: "click", page: number): void
}>()

const nuxtLinkParams = computed(() => ({
  position: props.target?.offsetTop - 50,
}))

const countPerPage = 12
const page = computed(() => (route.query.page ? +route.query.page - 1 : 0))
const maxPage = computed(() => Math.ceil(props.count / countPerPage))
</script>

<template>
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
</template>
