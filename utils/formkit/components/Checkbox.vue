<script setup lang="ts">
import type { FormKitFrameworkContext } from '@formkit/core'

const props = defineProps<{ context: FormKitFrameworkContext['node']['context'] }>()

function handleInput(e: boolean) {
  props.context?.node.input(e)
}
</script>

<template>
  <UCheckbox
    v-bind="context?.attrs"
    :label="context?.label"
    :disabled="!!context?.disabled"
    :model-value="context?._value ?? false"
    @update:model-value="handleInput"
    @blur="context?.handlers.blur"
  />
</template>
