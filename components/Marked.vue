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
  <div class="prose dark:prose-invert break-words max-w-6xl" v-html="markedText" />
</template>
