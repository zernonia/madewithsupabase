<script setup lang="ts">
import { ref } from 'vue'

const isSubmitted = ref(false)

definePageMeta({
  title: 'Project Submission',
})
</script>

<template>
  <div class="flex justify-center">
    <Form v-if="!isSubmitted" @submit="isSubmitted = true" />
    <div v-else class="text-center mt-12">
      <h1 class="text-5xl">
        Thank you for submitting!
      </h1>
      <p class="text-white">
        I'm trying my best to get this done ASAP!
      </p>
    </div>
  </div>
</template>
