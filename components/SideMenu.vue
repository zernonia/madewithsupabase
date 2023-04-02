<script lang="ts" setup></script>

<template>
  <div class="h-screen p-6">
    <div class="rounded-2xl bg-dark-500 p-6 w-80 flex flex-col h-full">
      <NuxtLink to="/">
        <img class="w-12 h-12 sm:w-18 sm:h-18" src="@/assets/logo.svg" alt="" />
      </NuxtLink>
      <h1>Hi, Supabase</h1>

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
