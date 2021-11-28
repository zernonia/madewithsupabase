<template>
  <div class="prose" v-html="markedText"></div>
</template>

<script setup lang="ts">
import marked from "marked"

const props = defineProps({
  text: {
    type: String,
    default: "",
  },
})

const markedText = computed(() => marked(props.text))
</script>
