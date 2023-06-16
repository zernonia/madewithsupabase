<script lang="ts" setup>
import type { PropType } from 'vue'

defineProps({
  features: Array as PropType<string[] | null>,
})
</script>

<template>
  <div>
    <UBadge
      v-for="feature in features"
      :key="feature"
      class="stroke-emerald-500 mr-2"
    >
      <UTooltip :text="feature" class="text-white">
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
      </UTooltip>
    </UBadge>
  </div>
</template>
