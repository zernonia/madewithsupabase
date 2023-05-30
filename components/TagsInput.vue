<script setup lang="ts">
const prop = defineProps({
  modelValue: {
    type: Array,
    default: [],
  },
})

const client = useSupabase()

const inputText = ref('')
function append(e: Event) {
  e.preventDefault()
  if (!inputText.value)
    return
  if (!prop.modelValue.includes(inputText.value)) {
    prop.modelValue.push(inputText.value)
    inputText.value = ''
  }
}
function remove(index: number) {
  prop.modelValue.splice(index, 1)
}

const dataCategory = ref<any[]>([])
async function fetchTags() {
  const { data, error } = await client
    .from('tags_view')
    .select('*')
    .order('count', {
      ascending: false,
    })
  if (data)
    dataCategory.value = data
}
fetchTags()
</script>

<template>
  <div class="w-full">
    <ul class="flex flex-wrap items-center pl-0">
      <div
        v-for="(item, index) in modelValue"
        class="tag-btn flex items-center px-4 py-2 mt-2 mr-2 rounded-md cursor-pointer bg-dark-400 hover:bg-dark-500"
        @click.prevent="remove(index)"
      >
        <p>
          {{ item }}
        </p>
        <div class="i-mdi:close ml-2" />
      </div>
    </ul>
    <div class="flex flex-col sm:flex-row items-center mt-2">
      <input
        v-model="inputText"
        placeholder="Analytics, Hackathon, Vuejs, ..."
        class="w-full sm:w-96"
        type="text"
        list="category"
        @keydown.enter="append"
        @blur="append"
      >
      <p class="ml-4 text-light-900">
        ← Press 'Enter' to Add
      </p>
    </div>
    <datalist id="category">
      <option v-for="tag in dataCategory" :value="tag.tags" />
    </datalist>
  </div>
</template>
