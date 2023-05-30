<script setup lang="ts">
import { ref } from 'vue'

const { params, meta } = useRoute()
const {
  options: { history },
} = useRouter()

const isSubmitting = ref(false)
const isApproved = ref(false)

const email = ref('')
const response = ref('')

async function verify(e: any) {
  if (!email.value)
    return
  e.preventDefault()
  isSubmitting.value = true
  response.value = ''

  const data = (await $fetch('/api/edit/verify', {
    method: 'POST',
    body: {
      email: email.value,
      slug: params.slug,
    },
  })) as any

  isSubmitting.value = false

  if (data.verify) {
    isApproved.value = true
  }
  else {
    response.value = 'Incorrect email'
    useNuxtApp().$toast.error('Incorrect email')
  }
}

const { data, refresh } = await useFetch(`/api/project/${params.slug}`, {
  method: 'GET',
})
refresh()

function handleSubmitted() {
  navigateTo(`/p/${data.value?.slug}`)
}

async function help(e: any) {
  const text = `Hi! I need help with ${data.value?.title}`
  window.open(
    `https://twitter.com/messages/compose?recipient_id=1425638581838647297&text=${encodeURI(
      text,
    )}`,
    '_blank',
  )
}

watch(
  data,
  () => {
    meta.title = `Editing: ${data.value?.title}`
    if (history.state.back)
      meta.back = true
  },
  { immediate: true },
)
</script>

<template>
  <div class="flex flex-col mt-6">
    <form
      v-if="!isApproved"
      class="flex flex-col space-y-4 rounded-md w-full max-w-screen-sm"
    >
      <p class="text-white">
        Verify that you are the author. Insert the email that you use when
        submitting the project.
      </p>
      <div class="flex flex-col">
        <label for="email">email</label>
        <input
          v-model="email"
          name="email"
          type="text"
          required
          placeholder="admin@madewithsupabase.com"
        >
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <button class="btn w-min flex items-center" @click="verify">
            Submit
            <SVGCircle
              v-if="isSubmitting"
              class="w-4 h-4 ml-4 animate-ping"
            />
          </button>
          <span>{{ response }}</span>
        </div>
        <button class="btn-icon text-sm" @click="help">
          Contact Admin
        </button>
      </div>
    </form>
    <Form
      v-if="data && isApproved"
      :default-value="data"
      @submit="handleSubmitted"
    />
  </div>
</template>
