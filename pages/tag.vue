<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const { params } = toRefs(useRoute())

const { tagOptions, supabaseFeatureOptions } = useTags()
const selected = ref(params.value.name)

const options = computed(() => [...supabaseFeatureOptions, ...(tagOptions.value ?? [])])

watch(() => params.value.name, (n) => {
  selected.value = n
})
</script>

<template>
  <div class="mt-6">
    <div class="flex items-center">
      <div class="mr-2 text-sm">
        Tag:
      </div>
      <USelectMenu
        v-model="selected"
        :options="options"
        class="!w-56"
        placeholder="Select tag"
        leading-icon="i-lucide-tag"
        @update:model-value="navigateTo(`/tag/${$event}`)"
      />
    </div>

    <NuxtPage />
  </div>
</template>
