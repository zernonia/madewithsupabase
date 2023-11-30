<script setup lang="ts">
import { marked } from 'marked'

const props = defineProps({
  text: {
    type: String,
    default: '',
  },
})

const markedText = computed(() => marked(props.text))
</script>

<template>
  <div class="prose-sm md:prose !prose-invert prose-headings:text-gray-100 prose-strong:text-gray-100  break-words max-w-6xl" v-html="markedText" />
</template>
