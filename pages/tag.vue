<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { OnClickOutside } from '@vueuse/components'
import { state } from '@/script/store'

const route = useRoute()
const client = useSupabase()
const supabaseTags = ref([
  {
    tags: 'Supabase Auth',
  },
  {
    tags: 'Supabase Database',
  },
  {
    tags: 'Supabase Function',
  },
  {
    tags: 'Supabase Storage',
  },
  {
    tags: 'Supabase Realtime',
  },
])
async function fetchTags() {
  if (state.tags.length)
    return
  const { data, error } = await client
    .from('tags_view')
    .select('*')
    .order('count', {
      ascending: false,
    })
  if (data)
    state.tags = data
}
fetchTags()
const isSelectionOpen = ref(false)
const searchPlaceholder = ref('')
const searchTag = ref('')
const searchSupabaseTags = computed(() => {
  const s = searchTag.value.toLocaleLowerCase().trim()
  if (!s)
    return supabaseTags.value
  return supabaseTags.value.filter(
    i => i.tags.toLocaleLowerCase().includes(s),
  )
})
const searchTags = computed(() => {
  const s = searchTag.value.toLocaleLowerCase().trim()
  if (!s)
    return state.tags
  return state.tags.filter(i => i.tags.toLocaleLowerCase().includes(s))
})
watch(
  () => route.params.name,
  () => {
    isSelectionOpen.value = false
    searchPlaceholder.value = route.params.name as string
  },
  { immediate: true },
)

definePageMeta({
  title: 'Tag',
})
</script>

<template>
  <div class="mt-6">
    <div class="flex text-xl items-center w-full">
      <OnClickOutside
        class="sm:w-80 lg:w-1/3"
        @trigger="isSelectionOpen = false"
      >
        <div class="relative flex items-center">
          <div class="i-eva:search-fill absolute left-4" />
          <input
            v-model="searchTag"
            class="!placeholder-white !focus:placeholder-gray-50 w-full !pl-12"
            type="text"
            :placeholder="searchPlaceholder"
            @focus="isSelectionOpen = true"
            @blur=""
          >
          <div
            v-if="isSelectionOpen"
            class="z-100 absolute w-full max-h-64 overflow-y-auto top-full left-0 flex flex-wrap rounded-lg bg-gray-500 backdrop-filter backdrop-blur-md bg-opacity-60"
          >
            <h5
              v-if="searchSupabaseTags.length"
              class="px-4 pt-5 pb-3 uppercase text-sm text-white opacity-50"
            >
              Supabase
            </h5>
            <router-link
              v-for="tag in searchSupabaseTags"
              class="inline-flex text-base justify-between px-4 py-2 bg-transparent w-full hover:bg-gray-500 focus:bg-gray-500 transition outline-none ring-none"
              :class="[$route.params.name === tag.tags ? 'bg-gray-500' : '']"
              :to="`/tag/${tag.tags}`"
            >
              <div>
                {{ tag.tags }}
              </div>
            </router-link>
            <h5
              v-if="searchTags.length"
              class="px-4 pt-5 pb-3 uppercase text-sm text-white opacity-50"
            >
              Tagging
            </h5>
            <router-link
              v-for="tag in searchTags"
              class="inline-flex text-base justify-between px-4 py-2 bg-transparent w-full hover:bg-gray-500 focus:bg-gray-500 transition outline-none ring-none"
              :class="[$route.params.name === tag.tags ? 'bg-gray-500' : '']"
              :to="`/tag/${tag.tags}`"
            >
              <div>
                {{ tag.tags }}
              </div>
            </router-link>
          </div>
        </div>
      </OnClickOutside>

      <div v-if="!route.params.name" class="flex items-center ml-4">
        <div class="i-mdi-arrow-left mr-2" />
        <span>Search for tag</span>
      </div>
    </div>
    <NuxtPage />
  </div>
</template>
