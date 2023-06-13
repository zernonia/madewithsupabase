<script setup lang="ts">
const routeModal = useRouteModal()
const { allProjects } = useAllProjects()

const data = computed(() =>
  allProjects.value.find(project => project.slug === routeModal.value.path.replace('/p/', '')),
)
</script>

<template>
  <RouteModalCommon>
    <div class="p-12">
      <Product v-if="data" is-modal :data="data" />
    </div>
  </RouteModalCommon>
</template>
