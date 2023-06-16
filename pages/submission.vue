<script setup lang="ts">
import { ref } from 'vue'
import { slugify } from '~~/functions/slugify'
import type { Project } from '~/types'

const client = useSupabase()
const user = useSupabaseUser()
const toast = useToast()

const isSubmitted = ref(false)

definePageMeta({
  title: 'Your New Project',
})

async function handleSubmit(ev: Project | null) {
  if (ev?.title && user.value?.email) {
    const slug = slugify(ev.title)
    const { data, error } = await client.from('products').insert({ ...ev, slug, email: user.value.email }).select('slug')
    if (!error) {
      toast.add({ title: 'Submitted successfully!' })
      isSubmitted.value = true
      navigateTo('/account')
    }
  }
}
</script>

<template>
  <div>
    <div v-if="user?.email" class="flex justify-center mt-8">
      <FormNew :handler="handleSubmit" />
    </div>

    <div v-else class="mt-8 flex justify-center ">
      <div class="bg-gray-700 rounded-xl border px-8 py-4 bg-opacity-40 text-sm border-gray-600 flex items-center justify-center w-full max-w-[28rem] mx-auto">
        <div>
          Please login to submit your projects
        </div>

        <UButton label="Login" to="/account" class="ml-4" trailing-icon="i-lucide-arrow-right" />
      </div>
    </div>
  </div>
</template>
