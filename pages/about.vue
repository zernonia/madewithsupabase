<template>
  <div class="mt-16 sm:mt-24 flex flex-col items-center">
    <h1 class="text-4xl">About</h1>
    <p class="mt-8 px-4 text-xl max-w-screen-md text-center">
      Made with Supabase is made to showcase all the project that uses
      <span> Supabase </span> as their preferred <span>Database</span>, <span> Authentication </span> or
      <span> Storage</span>. Most importantly, that Made with Supabase is indeed, made with Supabase too!
    </p>
    <br />
    <br />
    <h2 class="text-2xl">Tech Stack:</h2>
    <ul class="list-disc">
      <li>Vue 3 → Nuxt 3</li>
      <li>Vite</li>
      <li>WindiCSS</li>
      <li>Supabase</li>
    </ul>

    <div class="mt-12">
      <router-link class="px-6 py-3 rounded-lg bg-dark-400 hover:bg-dark-500 transition" to="contact">
        Contact
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  layout: "plain",
}
</script>

<style scoped>
span {
  @apply text-green-400;
}
</style>
