<script setup lang="ts">
const { path } = toRefs(useRoute())
const routeModal = useRouteModal()

// when user change path when the modal is open, we close the modal
watch(path, () => {
  if (path.value !== routeModal.value.path)
    routeModal.value.isOpen = false
})

// when modal is open, we pushState to create a new history in browser
watch(() => routeModal.value.isOpen, (n) => {
  if (n) {
    const path = routeModal.value.path
    if (path)
      history.pushState({ }, '', path)
  }
})

function handleModalClose() {
  history.back()
}

onMounted(() => {
  window.onpopstate = () => {
    routeModal.value.isOpen = false
  }
})
onBeforeUnmount(() => {
  window.onpopstate = null
})
</script>

<template>
  <div>
    <UModal
      v-model="routeModal.isOpen"
      :ui="{
        base: 'relative text-left overflow-hidden sm:my-8 mx-8 w-full flex flex-col border border-gray-700',
        rounded: 'rounded-2xl',
        width: 'max-w-[48rem]',
      }"
      @update:model-value="handleModalClose"
    >
      <slot />
    </UModal>
  </div>
</template>
