<script setup lang="ts">
import GoldenTicket from "@/assets/golden-ticket.png"
import GoldenTicket2 from "@/assets/golden-ticket-2.png"
</script>

<template>
  <div class="mt-4 w-full h-full max-w-screen-lg mx-auto">
    <NuxtLink
      to="/launch-week-5"
      class="group relative border-3 border-yellow-400 p-6 h-48 sm:h-64 lg:h-84 w-full flex flex-col justify-center items-center transition bg-dark-600 rounded-3xl relative overflow-hidden"
    >
      <div
        class="flex items-center z-10 transform group-hover:scale-105 transition-all bg-dark-600 p-4 md:p-8 backdrop-filter backdrop-blur rounded-xl bg-opacity-70"
      >
        <div class="mr-4 text-right">
          <h2
            class="text-xl md:text-3xl text-green-400 uppercase tracking-wider"
          >
            Launch week
          </h2>
          <h2 class="mt-1 text-3xl md:text-4xl">Hackathon</h2>
        </div>
        <div
          class="text-3xl md:text-6xl w-12 md:w-20 h-12 md:h-20 flex items-center justify-center rounded-xl bg-white text-[#3d8189]"
        >
          5
        </div>
      </div>
      <img
        class="absolute w-40 sm:w-64 h-auto rounded-xl z-0 -bottom-6 group-hover:bottom-6 transition-all -left-6 transform rotate-15"
        :src="GoldenTicket"
        alt="Supabase launch week golden ticket"
      />
      <img
        class="absolute w-40 sm:w-64 h-auto rounded-xl z-0 -bottom-6 group-hover:bottom-6 transition-all -right-16 transform -rotate-30"
        :src="GoldenTicket2"
        alt="Supabase launch week golden ticket"
      />
    </NuxtLink>
  </div>
</template>
