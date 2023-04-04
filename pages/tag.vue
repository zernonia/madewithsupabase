<template>
  <div class="mt-12 min-h-screen-md">
    <div class="flex text-xl items-center justify-center w-full">
      <OnClickOutside
        @trigger="isSelectionOpen = false"
        class="sm:w-80 lg:w-1/3 lg:px-6"
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
            class="z-100 absolute w-full max-h-64 overflow-y-auto top-full left-0 flex flex-wrap rounded-lg border-4 border-dark-300 bg-dark-600"
          >
            <h5
              v-if="searchSupabaseTags.length"
              class="px-4 pt-3 uppercase text-sm text-light-900 opacity-50"
            >
              Supabase
            </h5>
            <router-link
              class="inline-flex justify-between text-sm px-4 py-2 bg-dark-600 w-full hover:bg-dark-200 focus:bg-dark-200 outline-transparent ring-transparent"
              :class="[$route.params.name == tag.tags ? 'bg-dark-200' : '']"
              v-for="tag in searchSupabaseTags"
              :to="'/tag/' + tag.tags"
            >
              <div>
                {{ tag.tags }}
              </div>
            </router-link>
            <h5
              v-if="searchTags.length"
              class="px-4 pt-3 uppercase text-sm text-light-900 opacity-50"
            >
              Tagging
            </h5>
            <router-link
              class="inline-flex justify-between text-sm px-4 py-2 bg-dark-600 w-full hover:bg-dark-200 focus:bg-dark-200 outline-transparent ring-transparent"
              :class="[$route.params.name == tag.tags ? 'bg-dark-200' : '']"
              v-for="tag in searchTags"
              :to="'/tag/' + tag.tags"
            >
              <div>
                {{ tag.tags }}
              </div>
              <!-- <div>
              {{ tag.count }}
            </div> -->
            </router-link>
          </div>
        </div>
      </OnClickOutside>
    </div>
    <NuxtPage></NuxtPage>
  </div>
</template>

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
  pageTransition: {
    name: "fade",
    mode: "out-in",
  },
  title: "Tag",
})
</script>
