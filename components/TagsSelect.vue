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
        <i-mdi:close class="ml-2"></i-mdi:close>
      </div>
    </ul>
    <div class="flex flex-col sm:flex-row items-center mt-2">
      <input
        placeholder="Supabase Auth, Supabase Database ..."
        class="w-full sm:w-96"
        type="text"
        list="features"
        v-model="inputText"
        @keydown.enter="append"
      />
      <p class="ml-4 text-light-900">← Press 'Enter' to Add</p>
    </div>
    <datalist id="features">
      <option v-for="v in inputList" :value="v"></option>
    </datalist>
  </div>
</template>

<script setup lang="ts">
const prop = defineProps({
  modelValue: {
    type: Array,
    default: [],
  },
})
const inputList = ref([
  "Supabase Auth",
  "Supabase Database",
  "Supabase Function",
  "Supabase Storage",
  "Supabase Realtime",
])
const inputText = ref("")
const append = (e: Event) => {
  e.preventDefault()
  if (!inputText.value) return
  if (
    !prop.modelValue.includes(inputText.value) &&
    inputList.value.includes(inputText.value)
  ) {
    prop.modelValue.push(inputText.value)
    inputText.value = ""
  }
}
const remove = (index: number) => {
  prop.modelValue.splice(index, 1)
}
</script>
