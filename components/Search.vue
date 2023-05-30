<script setup lang="ts">
const client = useSupabase()

const searchTerm = ref('')
const computedSearchTerm = computed(() => {
  return searchTerm.value.trimEnd().split(' ').join(' | ')
})
async function searchingTerm() {
  // 'little | big'
  const { data } = await client.rpc('get_search_result', {
    search_term: computedSearchTerm.value,
  })
}
</script>

<template>
  <div>
    <input
      v-model="searchTerm"
      class="w-64"
      type="text"
      placeholder="Search"
      @input="searchingTerm"
    >
  </div>
</template>
