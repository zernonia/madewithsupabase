<template>
  <div class="flex flex-col items-center">
    <button
      @click="$router.back()"
      class="w-full mt-4 inline-flex items-center text-dark-50 hover:text-light-900 transition"
    >
      <div class="i-mdi:menu-left mr-2 w-6 h-6"></div>
      Back
    </button>
    <h1 id="form" class="text-3xl text-center mt-8">
      Editing: {{ routeData?.title }}
    </h1>
    <form
      v-if="!isApproved"
      class="flex flex-col space-y-4 p-4 md:p-8 rounded-md w-full max-w-screen-sm"
    >
      <p class="text-center text-dark-50">
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
      v-if="routeData && isApproved"
      :default-value="routeData"
      @submit="handleSubmitted"
    ></Form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
const route = useRoute()

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
      slug: route.params.name,
    },
  })) as any

  isSubmitting.value = false

  if (data.verify) {
    isApproved.value = true
  } else {
    response.value = "Incorrect email"
  }
}

const help = async (e: any) => {
  const text = `Hi! I need help with ${routeData.value?.title}`
  window.open(
    `https://twitter.com/messages/compose?recipient_id=1425638581838647297&text=${encodeURI(
      text
    )}`,
    "_blank"
  )
}

const { data: routeData, refresh } = await useFetch("/api/project", {
  method: "GET",
  query: { name: route.params.name },
  key: route.params.name.toString(),
})
refresh()

const handleSubmitted = () => {
  navigateTo(`/p/${routeData.value?.slug}`)
}
</script>
