<script setup lang="ts">
import type { FormKitFrameworkContext } from '@formkit/core'

const props = defineProps<{ context: FormKitFrameworkContext['node']['context'] }>()

function handleInput(e: string, label: 'email' | 'handler') {
  props.context?.node.input({
    ...props.context?._value,
    [label]: e,
  })
}

const isInvalid = computed(() => !props.context?.state.valid && props.context?.state.blurred)
</script>

<template>
  <div class="grid grid-cols-2 mb-2 gap-2">
    <UInput
      v-bind="context?.attrs"
      :disabled="!!context?.disabled"
      :model-value="context?._value.email ?? ''"
      :color="isInvalid ? 'red' : undefined"
      placeholder="Email"
      icon="i-lucide-at-sign"
      @update:model-value="handleInput($event, 'email')"
      @blur="context?.handlers.blur"
    />
    <UInput
      v-bind="context?.attrs"
      :disabled="!!context?.disabled"
      :model-value="context?._value.handler ?? ''"
      :color="isInvalid ? 'red' : undefined"
      placeholder="Twitter handler"
      icon="i-lucide-at-sign"
      @update:model-value="handleInput($event, 'handler')"
      @blur="context?.handlers.blur"
    />
  </div>
</template>
