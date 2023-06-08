<script lang="ts" setup></script>

<template>
  <menu class="w-full flex items-center justify-between">
    <div class="w-1/3">
      <HeaderButton />
    </div>
    <NuxtLink to="/" class="w-1/3 flex justify-center">
      <img class="w-16 h-16 sm:w-24 sm:h-24" src="@/assets/logo.svg" alt="">
    </NuxtLink>
    <div class="w-1/3 flex items-center justify-end space-x-2">
      <a
        rel="noopener"
        href="https://twitter.com/madewifsupabase"
        target="_blank"
        class="p-3 rounded-md flex items-center hover:bg-gray-300"
      ><div class="i-mdi:twitter w-6 h-6" /></a>
      <NuxtLink class="btn !ml-4 hidden md:block" to="/submission">
        Submit a Project
      </NuxtLink>
    </div>
  </menu>
</template>
