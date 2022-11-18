<template>
  <div class="w-full">
    <ul class="flex flex-wrap items-center pl-0">
      <div
        @click.prevent="remove(index)"
        v-for="(item, index) in modelValue"
        class="flex items-center px-4 py-2 mt-2 mr-2 rounded-md cursor-pointer bg-dark-400 hover:bg-dark-500"
      >
        <p>
          {{ item }}
        </p>
        <div class="i-mdi:close ml-2"></div>
      </div>
    </ul>
    <div class="flex flex-col sm:flex-row items-center mt-2">
      <input
        placeholder="Analytics, Hackathon, Vuejs, ..."
        class="w-full sm:w-96"
        type="text"
        list="category"
        v-model="inputText"
        @keydown.enter="append"
      />
      <p class="ml-4 text-light-900">← Press 'Enter' to Add</p>
    </div>
    <datalist id="category">
      <option v-for="tag in dataCategory" :value="tag.tags"></option>
    </datalist>
  </div>
</template>

<script setup lang="ts">
const client = useSupabase()

const prop = defineProps({
  modelValue: {
    type: Array,
    default: [],
  },
})
const inputText = ref("")
const append = (e: Event) => {
  e.preventDefault()
  if (!inputText.value) return
  if (!prop.modelValue.includes(inputText.value)) {
    prop.modelValue.push(inputText.value)
    inputText.value = ""
  }
}
const remove = (index: number) => {
  prop.modelValue.splice(index, 1)
}

const dataCategory = ref<any[]>([])
const fetchTags = async () => {
  const { data, error } = await client
    .from("tags_view")
    .select("*")
    .order("count", {
      ascending: false,
    })
  if (data) {
    dataCategory.value = data
  }
}
fetchTags()
</script>
