<script setup lang="ts">
const prop = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
})

const inputList = ref([
  'Supabase Auth',
  'Supabase Database',
  'Supabase Function',
  'Supabase Storage',
  'Supabase Realtime',
])

const inputText = ref('')

function append(e: Event) {
  e.preventDefault()
  if (!inputText.value)
    return
  if (
    !prop.modelValue.includes(inputText.value)
    && inputList.value.includes(inputText.value)
  ) {
    prop.modelValue.push(inputText.value)
    inputText.value = ''
  }
}
function remove(index: number) {
  prop.modelValue.splice(index, 1)
}
</script>

<template>
  <div class="w-full">
    <ul class="flex flex-wrap items-center pl-0">
      <div
        v-for="(item, index) in modelValue"
        class="tag-btn flex items-center px-4 py-2 mt-2 mr-2 rounded-md cursor-pointer bg-gray-400 hover:bg-gray-500"
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
        placeholder="Supabase Auth, Supabase Database ..."
        class="w-full sm:w-96"
        type="text"
        list="features"
        @keydown.enter="append"
        @blur="append"
      >
      <p class="ml-4 text-white">
        ← Press 'Enter' to Add
      </p>
    </div>
    <datalist id="features">
      <option v-for="v in inputList" :value="v" />
    </datalist>
  </div>
</template>
