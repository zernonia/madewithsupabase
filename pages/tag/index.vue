<script setup lang="ts">
const { data } = useNuxtData('tagOptions')
</script>

<template>
  <div class="mt-6 ">
    <Transition name="fade" appear>
      <div v-if="data?.length" class="flex flex-wrap justify-center">
        <UButton v-for="tag in data" :key="tag" class="mr-2 mb-2" :to="`/tag/${tag}`" :label="tag" color="gray">
          <template #leading>
            <UIcon name="i-lucide-hash" />
          </template>
        </UButton>
      </div>
    </Transition>
  </div>
</template>
