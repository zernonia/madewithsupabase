<script setup lang="ts">
const isBlur = ref(true)

onMounted(() => (isBlur.value = false))
</script>

<template>
  <div class="my-8 w-full h-full max-w-screen-lg mx-auto">
    <NuxtLink
      to="/launch-week-6"
      class="relative h-48 sm:h-80 lg:h-100 w-full flex flex-col justify-center items-center transition-all rounded-3xl relative outline outline-dark-100 hover:outline-dark-50 shadow-none hover:shadow-xl shadow-dark-300 overflow-hidden"
    >
      <img
        src="~~/assets/launch-week-6.png"
        alt="Supabase Launch Week 6 Hackathon"
        class="w-full h-full object-cover transition duration-750"
        :class="[isBlur ? 'blur-md opacity-60' : 'blur-0 opacity-100']"
        style="object-position: center 68%"
      />
    </NuxtLink>
  </div>
</template>
