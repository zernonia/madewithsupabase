<script setup lang="ts">
const routeModal = useRouteModal()
const { allProjects } = useAllProjects()

const data = computed(() =>
  allProjects.value.find(project => project.slug === routeModal.value.path.replace('/p/', '')),
)
</script>

<template>
  <RouteModalCommon>
    <div class="p-4 md:p-12">
      <Product v-if="data" is-modal :data="data" :is-admin="routeModal.isAdmin" />
    </div>
  </RouteModalCommon>
</template>
