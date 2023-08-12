<script setup lang="ts">
defineProps<{
  date: Date
}>()
</script>

<template>
  <LegoCountDown v-slot="{ days, hours, minutes, seconds }" :date="date" enable-days>
    <div class="flex items-center space-x-2 md:space-x-4 text-gray-700">
      <div class="w-14 h-14 md:w-20 md:h-20 p-2 bg-white rounded-lg flex flex-col items-center justify-center">
        <h5 class="text-xl md:text-3xl font-semibold">
          {{ days }}
        </h5>
        <p class="text-xs md:mt-1 text-indigo-700 font-medium">
          Days
        </p>
      </div>

      <div class="w-14 h-14 md:w-20 md:h-20 p-2 bg-white rounded-lg flex flex-col items-center justify-center">
        <h5 class="text-xl md:text-3xl font-semibold">
          {{ hours }}
        </h5>
        <p class="text-xs md:mt-1 text-indigo-700 font-medium">
          Hours
        </p>
      </div>

      <div class="w-14 h-14 md:w-20 md:h-20 p-2 bg-white rounded-lg flex flex-col items-center justify-center">
        <h5 class="text-xl md:text-3xl font-semibold">
          {{ minutes }}
        </h5>
        <p class="text-xs md:mt-1 text-indigo-700 font-medium">
          Minutes
        </p>
      </div>

      <div class="w-14 h-14 md:w-20 md:h-20 p-2 bg-white rounded-lg flex flex-col items-center justify-center">
        <h5 class="text-xl md:text-3xl font-semibold">
          {{ seconds }}
        </h5>
        <p class="text-xs md:mt-1 text-indigo-700 font-medium">
          Seconds
        </p>
      </div>
    </div>
  </LegoCountDown>
</template>
