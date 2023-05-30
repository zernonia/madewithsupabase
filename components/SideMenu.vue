<script lang="ts" setup></script>

<template>
  <div
    class="h-full overflow-y-auto bg-dark-700 md:bg-transparent md:h-screen md:p-6"
  >
    <div class="md:rounded-2xl p-6 w-80 bg-dark-700 flex flex-col h-full">
      <div class="hidden md:block">
        <div class="flex justify-center mt-4">
          <NuxtLink to="/">
            <img class="md:w-28 md:h-28" src="@/assets/logo.svg" alt="">
          </NuxtLink>
        </div>
        <h1 class="text-2xl mt-6 text-center">
          Made with Supabase
        </h1>
      </div>

      <div class="md:mt-8 rounded-xl overflow-hidden flex-shrink-0">
        <NuxtLink to="/flutter-hackathon">
          <img
            src="@/assets/flutter-hackathon-winners.webp"
            class="scale-120 hover:scale-145 transition duration-750"
            alt=""
          >
        </NuxtLink>
      </div>

      <NuxtLink to="/submission" class="btn text-center mt-6">
        Submit a project
      </NuxtLink>

      <menu class="flex-1 flex flex-col mt-12 gap-4">
        <NuxtLink
          to="/"
          class="px-6 py-2 flex items-center space-x-4 border-l-2 border-transparent hover:border-white transition"
        >
          <div class="mr-4 i-mdi-home" />
          Home
        </NuxtLink>
        <NuxtLink
          to="/tag"
          class="px-6 py-2 flex items-center space-x-4 border-l-2 border-transparent hover:border-white transition"
        >
          <div class="mr-4 i-mdi-tag" />
          Tag
        </NuxtLink>
        <NuxtLink
          to="/month"
          class="px-6 py-2 flex items-center space-x-4 border-l-2 border-transparent hover:border-white transition"
        >
          <div class="mr-4 i-ic-baseline-calendar-month" />
          Month
        </NuxtLink>
        <NuxtLink
          to="/testimonial"
          class="px-6 py-2 flex items-center space-x-4 border-l-2 border-transparent hover:border-white transition"
        >
          <div class="mr-4 i-mdi-chat" />
          Testimonial
        </NuxtLink>
      </menu>

      <div class="flex-shrink-0 mt-4">
        <div class="flex flex-row items-center space-x-4">
          <NuxtLink
            target="_blank"
            to="https://twitter.com/madewifsupabase"
            class="text-sm text-center text-opacity-40 hover:text-opacity-100 text-white transition"
          >
            <div class="text-2xl i-mdi-twitter" />
          </NuxtLink>
          <NuxtLink
            target="_blank"
            to="https://github.com/zernonia/madewithsupabase"
            class="text-sm text-center text-opacity-40 hover:text-opacity-100 text-white transition"
          >
            <div class="text-2xl i-mdi-github" />
          </NuxtLink>

          <NuxtLink
            target="_blank"
            to="https://zernonia.com"
            class="text-sm text-center text-opacity-40 hover:text-opacity-100 text-white transition"
          >
            Made by Zernonia
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
menu .router-link-active {
  @apply border-white;
}
</style>
