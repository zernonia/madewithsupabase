<script setup lang="ts">
import GoldenTicket from "@/assets/golden-ticket.png"
import GoldenTicket2 from "@/assets/golden-ticket-2.png"
import HeroImage from "@/assets/launch-week-5-hackathon.jpeg"
</script>

<template>
  <div class="mt-4 w-full h-full max-w-screen-lg mx-auto">
    <NuxtLink
      to="/launch-week-5"
      class="group relative border-3 border-yellow-400 h-64 sm:h-104 lg:h-140 w-full flex flex-col justify-center items-center transition bg-dark-600 rounded-3xl relative overflow-hidden"
    >
      <img
        :src="HeroImage"
        alt="Supabase Launch Week 5 Hackathon"
        class="w-full h-full object-cover"
        style="object-position: center 68%"
      />
    </NuxtLink>
  </div>
</template>
