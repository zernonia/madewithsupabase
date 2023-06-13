<script setup lang="ts">
import type { Project } from '~/types'

const client = useSupabase()
const toast = useToast()
const { params } = useRoute()
const { allProjects } = useAllProjects()

const slug = params.slug

const { data, pending } = await useLazyAsyncData(`/api/project/${slug}`, async () => {
  const { data } = await client.from('products').select('*').eq('slug', slug).single()
  return data
}, {
  server: false,
  default: () => {
    return allProjects.value?.find(project => project.slug === slug)
  },
})

async function login(ev: Project | null) {
  if (ev?.id) {
    const { error } = await client.from('products').update(ev).eq('id', ev.id)

    if (!error) {
      toast.add({ title: 'Updated successfully!' })
      navigateTo('/account')
    }
  }
}

definePageMeta({
  title: 'Editing Project',
})
</script>

<template>
  <div>
    <div v-if="data?.id" class="flex justify-center mt-8">
      <FormNew :data="data" :handler="login" />
    </div>

    <Loading :loading="pending" />
  </div>
</template>
