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
        base: 'relative text-left overflow-hidden  sm:my-16 sm:mx-8 w-full flex flex-col border border-gray-700',
      }"
      @update:model-value="handleModalClose"
    >
      <UButton icon="i-lucide-x" class="md:hidden absolute top-2 left-2" variant="ghost" color="gray" @click="handleModalClose()" />
      <slot />
    </UModal>
  </div>
</template>
