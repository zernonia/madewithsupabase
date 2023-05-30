<script lang="ts" setup>
import type { PropType } from 'vue'

defineProps({
  features: Array as PropType<string[] | null>,
})
</script>

<template>
  <div>
    <div
      v-for="feature in features"
      class="inline-flex mr-2 h-8 w-8 items-center justify-center rounded-md bg-white bg-opacity-90"
    >
      <SupabaseAuthIcon v-if="feature === 'Supabase Auth'" />
      <SupabaseDBIcon v-if="feature === 'Supabase Database'" />
      <SupabaseEdgeFunctionIcon
        v-if="feature === 'Supabase Function'"
      />
      <SupabaseStorageIcon
        v-if="feature === 'Supabase Storage'"
      />
      <SupabaseRealtimeIcon
        v-if="feature === 'Supabase Realtime'"
      />
    </div>
  </div>
</template>
