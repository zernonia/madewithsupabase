<script lang="ts" setup>
import { PropType } from "vue"

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
      <SupabaseAuthIcon v-if="feature === 'Supabase Auth'"></SupabaseAuthIcon>
      <SupabaseDBIcon v-if="feature === 'Supabase Database'"></SupabaseDBIcon>
      <SupabaseEdgeFunctionIcon
        v-if="feature === 'Supabase Function'"
      ></SupabaseEdgeFunctionIcon>
      <SupabaseStorageIcon
        v-if="feature === 'Supabase Storage'"
      ></SupabaseStorageIcon>
      <SupabaseRealtimeIcon
        v-if="feature === 'Supabase Realtime'"
      ></SupabaseRealtimeIcon>
    </div>
  </div>
</template>
