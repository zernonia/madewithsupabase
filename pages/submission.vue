<script setup lang="ts">
import { ref } from 'vue'

const isSubmitted = ref(false)

definePageMeta({
  title: 'Project Submission',
})

const a = ref()

const options = ['United States', 'Canada', 'Mexico']

const axios = {
  post: () => new Promise(r => setTimeout(r, 2000)),
}

async function login() {
  console.log('triggering ')
  const res = await axios.post()
  // do some login things now
  // alert('Logged in!')
}
</script>

<template>
  <div class="flex justify-center">
    <FormKit v-slot="{ value }" v-model="a" type="form" :actions="false" @submit="login">
      <FormKit
        type="uinput"
        label="Title"
        name="title"
        placeholder="My project"
      />

      <FormKit
        type="uinput"
        label="Email"
        name="email"
        placeholder="madewithsupabase@gmail.com"
      />

      <FormKit
        type="uinput"
        label="URL"
        name="url"
        placeholder="https://madewithsupabase.com"
      />

      <FormKit
        type="uinput"
        label="GitHub URL"
        name="github_url"
        help="url for your project"
        placeholder="https://github.com/zernonia/madewithsupabase"
      />

      <FormKit
        type="utextarea"
        label="Description (Markdown)"
        name="description"
        placeholder="Write some description about your project"
        validation="required"
      />

      <FormKit type="ubutton" label="Submit" />

      <!-- <FormKit
        type="uselect"
        label="City"
        :options="options"
        name="city"
        placeholder="Jane Doe"
        help="What do people call you?"
        validation="required"
      /> -->

      <pre wrap>{{ value }}</pre>
    </FormKit>
    <!-- <Form v-if="!isSubmitted" @submit="isSubmitted = true" />
    <div v-else class="text-center mt-12">
      <h1 class="text-5xl">
        Thank you for submitting!
      </h1>
      <p class="text-white">
        I'm trying my best to get this done ASAP!
      </p>
    </div> -->
  </div>
</template>
