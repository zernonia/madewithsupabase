<script setup lang="ts">
import { ref } from "vue"
const { params, meta } = useRoute()
const {
  options: { history },
} = useRouter()

const isSubmitting = ref(false)
const isApproved = ref(false)

const email = ref("")
const response = ref("")

const verify = async (e: any) => {
  if (!email.value) return
  e.preventDefault()
  isSubmitting.value = true
  response.value = ""

  const data = (await $fetch("/api/edit/verify", {
    method: "POST",
    body: {
      email: email.value,
      slug: params.slug,
    },
  })) as any

  isSubmitting.value = false

  if (data.verify) {
    isApproved.value = true
  } else {
    response.value = "Incorrect email"
    useNuxtApp().$toast.error("Incorrect email")
  }
}

const help = async (e: any) => {
  const text = `Hi! I need help with ${data.value?.title}`
  window.open(
    `https://twitter.com/messages/compose?recipient_id=1425638581838647297&text=${encodeURI(
      text
    )}`,
    "_blank"
  )
}

const { data, refresh } = await useFetch(`/api/project/${params.slug}`, {
  method: "GET",  
})
refresh()

const handleSubmitted = () => {
  navigateTo(`/p/${data.value?.slug}`)
}

watch(
  data,
  () => {
    meta.title = `Editing: ${data.value?.title}`
    if (history.state.back) meta.back = true
  },
  { immediate: true }
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
          name="email"
          type="text"
          v-model="email"
          required
          placeholder="admin@madewithsupabase.com"
        />
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <button class="btn w-min flex items-center" @click="verify">
            Submit
            <SVGCircle
              v-if="isSubmitting"
              class="w-4 h-4 ml-4 animate-ping"
            ></SVGCircle>
          </button>
          <span>{{ response }}</span>
        </div>
        <button @click="help" class="btn-icon text-sm">Contact Admin</button>
      </div>
    </form>
    <Form
      v-if="data && isApproved"
      :default-value="data"
      @submit="handleSubmitted"
    ></Form>
  </div>
</template>
