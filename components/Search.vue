<template>
  <div>
    <input
      class="w-64"
      type="text"
      placeholder="Search"
      v-model="searchTerm"
      @input="searchingTerm"
    />
  </div>
</template>

<script setup lang="ts">
const client = useSupabase()

const searchTerm = ref("")
const computedSearchTerm = computed(() => {
  return searchTerm.value.trimEnd().split(" ").join(" | ")
})
const searchingTerm = async () => {
  // 'little | big'
  const { data } = await client.rpc("get_search_result", {
    search_term: computedSearchTerm.value,
  })
}
</script>
