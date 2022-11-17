<template>
  <footer
    class="text-center mt-16 sm:mt-36 mb-4 flex flex-col items-center justify-center"
  >
    <div
      class="relative rounded-lg bg-gradient-to-tr from-green-600 to-emerald-400 w-full p-8 inline-flex flex-col space-y-2"
    >
      <p class="text-2xl"># madewithsupabase</p>
      <h1 class="text-4xl">Collection of projects made with Supabase</h1>
      <p class="!mt-8">
        I made this to showcase the ⚡ Power of Supabase.
        <br />
        If your app/project is using Supabase and want to show off to the world,
        <br />
        Feel free to submit your project ya!
        <br />
      </p>
      <NuxtLink
        class="!mt-8 btn-pale hover:bg-dark-900 self-center"
        to="/submission"
      >
        Join us! Submit a Project 🚀
      </NuxtLink>
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
