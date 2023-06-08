<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  count: { type: Number, required: true },
  target: { type: Object as PropType<HTMLElement>, required: true },
})

const emit = defineEmits<{
  (e: 'click', page: number): void
}>()

const route = useRoute()

const nuxtLinkParams = computed(() => ({
  position: props.target?.offsetTop - 50,
}))

const countPerPage = 12
const page = computed(() => (route.query.page ? +route.query.page - 1 : 0))
const maxPage = computed(() => Math.ceil(props.count / countPerPage))
const pageArray = computed(() => {
  const showPage = 5
  if (page.value === 0 || page.value === 1)
    return [1, 2, 3, 4, 5]
  if (page.value === maxPage.value - 1 || page.value === maxPage.value - 2) {
    return [
      maxPage.value - 4,
      maxPage.value - 3,
      maxPage.value - 2,
      maxPage.value - 1,
      maxPage.value,
    ]
  }
  else {
    return [
      page.value - 1,
      page.value,
      page.value + 1,
      page.value + 2,
      page.value + 3,
    ]
  }
})
</script>

<template>
  <div class="mt-12 w-full flex space-x-2 items-center justify-center">
    <div>
      <NuxtLink
        v-if="page !== 0"
        class="text-gray-300 hover:text-gray-300 rounded-lg transition ease-in-out"
        :to="{
          query: { page },
          params: nuxtLinkParams,
        }"
      >
        <div class="i-mdi:menu-left w-8 h-8" />
      </NuxtLink>
      <div v-else class="w-8 h-8" />
    </div>
    <div class="flex flex-wrap justify-center">
      <NuxtLink
        v-for="i in pageArray"
        class="border-4 border-gray-300 hover:border-gray-300 mr-2 mb-2 w-12 h-12 inline-flex items-center justify-center rounded-lg transition ease-in-out"
        :class="[page === i - 1 ? ' border-gray-300' : '']"
        :to="{
          query: { page: i },
          params: nuxtLinkParams,
        }"
      >
        {{ i }}
      </NuxtLink>
    </div>
    <div>
      <NuxtLink
        v-if="page !== maxPage - 1"
        class="text-gray-300 hover:text-gray-300 rounded-lg transition ease-in-out"
        :to="{
          query: { page: page + 2 },
          params: nuxtLinkParams,
        }"
      >
        <div class="i-mdi:menu-right w-8 h-8" />
      </NuxtLink>
      <div v-else class="w-8 h-8" />
    </div>
  </div>
</template>
