<script setup lang="ts">
import type { Project } from '~/types'

const props = defineProps<{
  item: Project | null
}>()

const isDeleteModalOpen = ref(false)

const items = [[{
  label: 'View',
  icon: 'i-lucide-external-link',
  click: () => {
    window.open(`/p/${props.item?.slug}`, '_blank')
  },
}, {
  label: 'Edit',
  icon: 'i-lucide-edit',
  shortcuts: ['E'],
  click: () => {
    navigateTo(`/account/edit/${props.item?.slug}`)
  },
}], [{
  label: 'Delete',
  icon: 'i-lucide-trash',
  shortcuts: ['⌘', 'D'],
  click: () => {
    isDeleteModalOpen.value = true
  },
}],
]

const client = useSupabase()
const toast = useToast()
const isDeleting = ref(false)
async function handleDelete() {
  isDeleting.value = true
  const { error } = await client.from('products').delete().eq('id', props.item?.id)
  if (!error) {
    toast.add({ title: 'Deleted successfully!' })
    isDeleteModalOpen.value = false
    refreshNuxtData('account-project')
  }
}
</script>

<template>
  <div class="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
    <UDropdown :items="items" :popper="{ placement: 'bottom-end' }">
      <UButton color="white" label="Options" trailing-icon="i-heroicons-chevron-down-20-solid" />
    </UDropdown>

    <UModal v-model="isDeleteModalOpen">
      <div class="p-8 flex flex-col items-center text-sm w-max">
        <h5 class="text-lg">
          Delete <span class="text-primary-400">{{ item?.title }}</span>?
        </h5>

        <div class="max-w-[20rem] text-center my-2">
          All information regarding this project will be deleted, and can't be recovered.
        </div>

        <div class="mt-2">
          <UButton :loading="isDeleting" variant="ghost" color="red" @click="handleDelete">
            Yes
          </UButton>
          <UButton :disabled="isDeleting" class="ml-4" @click="isDeleteModalOpen = false">
            No
          </UButton>
        </div>
      </div>
    </UModal>
  </div>
</template>
