<script setup lang="ts">
import { useLocalStorage } from "@vueuse/core"

const client = useSupabase()

const email = ref("")
const isSubmitted = useLocalStorage("newsletter", false)
const submitForm = async () => {
  if (email.value.length) {
    const { error } = await client.from("forms").insert({ email: email.value })
    if (!error) {
      isSubmitted.value = true
    }
  }
}
</script>

<template>
  <footer
    class="text-center mt-16 sm:mt-36 mb-4 flex flex-col items-center justify-center"
  >
    <div
      class="relative rounded-lg bg-gradient-to-tr from-emerald-600 to-emerald-400 w-full p-8 inline-flex flex-col items-center space-y-2"
    >
      <p class="text-2xl"># madewithsupabase</p>
      <h1 class="text-4xl">Collection of projects made with Supabase</h1>

      <div v-if="!isSubmitted" class="">
        <p>Subscribe to our newsletter!</p>

        <div class="flex items-center mt-8 relative">
          <input
            type="text"
            v-model="email"
            placeholder="foo@bar.com"
            class="w-96 !py-2.5"
          />
          <button
            :disabled="!email"
            class="px-2 py-1.5 rounded absolute right-2 disabled:opacity-60 bg-dark-200"
            @click="submitForm"
          >
            Submit
          </button>
        </div>
      </div>
      <div v-else class="">
        <NuxtLink
          class="!mt-8 btn-pale hover:bg-dark-900 self-center"
          to="/submission"
        >
          Join us! Submit a Project 🚀
        </NuxtLink>
      </div>

      <SVGCircle class="absolute -right-10 -bottom-10"></SVGCircle>
    </div>
    <div
      class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 items-center mt-16"
    >
      <NuxtLink to="/about">About</NuxtLink>
      <p class="px-2 hidden sm:block">|</p>
      <NuxtLink to="/contact">Contact</NuxtLink>
      <p class="px-2 hidden sm:block">|</p>
      <div class="inline-flex items-center">
        <p>Created by</p>
        <a
          href="https://www.zernonia.com"
          rel="noopener"
          target="_blank"
          class="ml-2 relative underline underline-offset-2 underline-dark-100 underline-3"
        >
          Zernonia</a
        >
        <a rel="noopener" href="https://twitter.com/zernonia" target="_blank">
          <div class="i-mdi:twitter ml-2"></div>
        </a>
      </div>
    </div>
  </footer>
</template>
