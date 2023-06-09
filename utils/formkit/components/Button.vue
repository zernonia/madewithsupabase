<script setup lang="ts">
import { type FormKitFrameworkContext } from '@formkit/core'

const props = defineProps<{ context: FormKitFrameworkContext['node']['context'] }>()

const loading = computed(() => !!props.context?.node.parent?.context?.state.loading)
const disabled = computed(() => !!props.context?.disabled)

function handleSubmit() {
  props.context?.node.submit()
}
</script>

<template>
  <UButton
    v-bind="context?.attrs"
    :label="context?.label"
    :disabled="disabled"
    :loading="loading"
    @click="handleSubmit"
  />
</template>
