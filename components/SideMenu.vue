<script lang="ts" setup></script>

<template>
  <div class="h-screen p-6">
    <div class="rounded-2xl bg-dark-500 p-6 w-80 flex flex-col h-full">
      <div class="flex justify-center mt-4">
        <NuxtLink to="/">
          <img
            class="w-12 h-12 md:w-28 md:h-28"
            src="@/assets/logo.svg"
            alt=""
          />
        </NuxtLink>
      </div>
      <h1 class="text-2xl mt-6 text-center">Made with Supabase</h1>

      <button class="btn mt-4">Submit a project</button>

      <menu class="flex-1">
        <li></li>
      </menu>

      <div class="flex-shrink-0">
        <div
          class="p-8 bg-gradient-to-tr from-emerald-600 to-emerald-400 rounded-xl flex flex-col text-center"
        >
          <h3>Showcase your project</h3>
          <button class="btn-icon mt-4">Submit</button>
        </div>

        <div class="mt-4">
          <p class="text-sm">Made by Zernonia</p>
        </div>
      </div>
    </div>
  </div>
</template>
