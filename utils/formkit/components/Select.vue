<script setup lang="ts">
import type { FormKitFrameworkContext } from '@formkit/core'

const props = defineProps<{ context: FormKitFrameworkContext['node']['context'] }>()

function getDefaultValue() {
  if (props.context?._value)
    return props.context._value
  if (props.context?.attrs.multiple)
    return []

  else
    return ''
}

const isInvalid = computed(() => !props.context?.state.valid && props.context?.state.blurred)

const selected = ref(getDefaultValue())

watch(selected, (n) => {
  props.context?.node.input(n)
})
</script>

<template>
  <USelectMenu
    v-bind="context?.attrs"
    v-model="selected"
    :disabled="!!context?.disabled"
    :color="isInvalid ? 'red' : undefined"
    @close="context?.handlers.blur"
  >
    <template #label>
      <span v-if="selected.length" class="truncate">{{ selected.join(', ') }}</span>
      <span v-else class="text-gray-500">{{ context?.attrs.placeholder }}</span>
    </template>
  </USelectMenu>
</template>
