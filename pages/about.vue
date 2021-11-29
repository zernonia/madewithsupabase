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
    <div class="mt-4">
      <a
        target="_blank"
        href="https://v3.nuxtjs.org/"
        rel="noopener"
        class="text-sm rounded-md bg-dark-400 mr-2 mb-2 px-4 py-2"
        >Vue 3 → Nuxt 3</a
      >
      <a
        target="_blank"
        href="https://vitejs.dev/"
        rel="noopener"
        class="text-sm rounded-md bg-dark-400 mr-2 mb-2 px-4 py-2"
        >Vite</a
      >
      <a
        target="_blank"
        href="https://windicss.org/"
        rel="noopener"
        class="text-sm rounded-md bg-dark-400 mr-2 mb-2 px-4 py-2"
        >WindiCSS</a
      >
      <a
        target="_blank"
        href="https://supabase.com/"
        rel="noopener"
        class="text-sm rounded-md bg-dark-400 mr-2 mb-2 px-4 py-2"
        >Supabase</a
      >
      <a
        target="_blank"
        href="https://vercel.com/"
        rel="noopener"
        class="text-sm rounded-md bg-dark-400 mr-2 mb-2 px-4 py-2"
        >Vercel</a
      >
    </div>

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
