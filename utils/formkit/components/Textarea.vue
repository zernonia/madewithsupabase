<script setup lang="ts">
import type { FormKitFrameworkContext } from '@formkit/core'

const props = defineProps<{ context: FormKitFrameworkContext['node']['context'] }>()

function handleInput(e: string) {
  props.context?.node.input(e)
}

const isInvalid = computed(() => !props.context?.state.valid && props.context?.state.blurred)
</script>

<template>
  <UTextarea
    v-bind="context?.attrs"
    :disabled="!!context?.disabled"
    :model-value="context?._value ?? ''"
    :color="isInvalid ? 'red' : undefined"
    @update:model-value="handleInput"
    @blur="context?.handlers.blur"
  />
</template>
