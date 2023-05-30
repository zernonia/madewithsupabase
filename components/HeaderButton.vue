<template>
  <div class="flex">
    <NuxtLink to="/tag/Web%20Apps">
      <div
        class="btn-pale !p-0 w-9 !md:w-12 h-9 !md:h-12 inline-flex items-center justify-center mr-2"
      >
        <div class="i-mdi-tag" />
      </div>
    </NuxtLink>
    <NuxtLink :to="`/month/${new Date().getMonth() + 1}`">
      <div
        class="btn-pale !p-0 w-9 !md:w-12 h-9 !md:h-12 inline-flex items-center justify-center"
      >
        <div class="i-ic-baseline-calendar-month" />
      </div>
    </NuxtLink>
  </div>
</template>
