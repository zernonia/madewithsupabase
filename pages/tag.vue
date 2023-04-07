<script setup lang="ts">
import { ref, computed, watch } from "vue"
import { state } from "@/script/store"
import { useRoute } from "vue-router"
import { OnClickOutside } from "@vueuse/components"

const route = useRoute()
const client = useSupabase()
const supabaseTags = ref([
  {
    tags: "Supabase Auth",
  },
  {
    tags: "Supabase Database",
  },
  {
    tags: "Supabase Function",
  },
  {
    tags: "Supabase Storage",
  },
  {
    tags: "Supabase Realtime",
  },
])
const fetchTags = async () => {
  if (state.tags.length) return
  const { data, error } = await client
    .from("tags_view")
    .select("*")
    .order("count", {
      ascending: false,
    })
  if (data) {
    state.tags = data
  }
}
fetchTags()
const isSelectionOpen = ref(false)
const searchPlaceholder = ref("")
const searchTag = ref("")
const searchSupabaseTags = computed(() => {
  let s = searchTag.value.toLocaleLowerCase().trim()
  if (!s) return supabaseTags.value
  return supabaseTags.value.filter(
    (i) => i.tags.toLocaleLowerCase().indexOf(s) > -1
  )
})
const searchTags = computed(() => {
  let s = searchTag.value.toLocaleLowerCase().trim()
  if (!s) return state.tags
  return state.tags.filter((i) => i.tags.toLocaleLowerCase().indexOf(s) > -1)
})
watch(
  () => route.params.name,
  () => {
    isSelectionOpen.value = false
    searchPlaceholder.value = route.params.name as string
  },
  { immediate: true }
)

definePageMeta({
  title: "Tag",
})
</script>

<template>
  <div class="mt-6">
    <div class="flex text-xl items-center w-full">
      <OnClickOutside
        @trigger="isSelectionOpen = false"
        class="sm:w-80 lg:w-1/3"
      >
        <div class="relative flex items-center">
          <div class="i-eva:search-fill absolute left-4"></div>
          <input
            class="!placeholder-light-50 !focus:placeholder-dark-50 w-full !pl-12"
            type="text"
            v-model="searchTag"
            :placeholder="searchPlaceholder"
            @focus="isSelectionOpen = true"
            @blur=""
          />
          <div
            v-if="isSelectionOpen"
            class="z-100 absolute w-full max-h-64 overflow-y-auto top-full left-0 flex flex-wrap rounded-lg bg-dark-500 backdrop-filter backdrop-blur-md bg-opacity-60"
          >
            <h5
              v-if="searchSupabaseTags.length"
              class="px-4 pt-5 pb-3 uppercase text-sm text-light-900 opacity-50"
            >
              Supabase
            </h5>
            <router-link
              class="inline-flex text-base justify-between px-4 py-2 bg-transparent w-full hover:bg-dark-500 focus:bg-dark-500 transition outline-none ring-none"
              :class="[$route.params.name == tag.tags ? 'bg-dark-500' : '']"
              v-for="tag in searchSupabaseTags"
              :to="'/tag/' + tag.tags"
            >
              <div>
                {{ tag.tags }}
              </div>
            </router-link>
            <h5
              v-if="searchTags.length"
              class="px-4 pt-5 pb-3 uppercase text-sm text-light-900 opacity-50"
            >
              Tagging
            </h5>
            <router-link
              class="inline-flex text-base justify-between px-4 py-2 bg-transparent w-full hover:bg-dark-500 focus:bg-dark-500 transition outline-none ring-none"
              :class="[$route.params.name == tag.tags ? 'bg-dark-500' : '']"
              v-for="tag in searchTags"
              :to="'/tag/' + tag.tags"
            >
              <div>
                {{ tag.tags }}
              </div>
            </router-link>
          </div>
        </div>
      </OnClickOutside>

      <div class="flex items-center ml-4" v-if="!route.params.name">
        <div class="i-mdi-arrow-left mr-2"></div>
        <span>Search for tag</span>
      </div>
    </div>
    <NuxtPage></NuxtPage>
  </div>
</template>
