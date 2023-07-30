<script setup lang="ts">
import dayjs from 'dayjs/esm'
import utc from 'dayjs/esm/plugin/utc'
import timezone from 'dayjs/esm/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

const hackathons = [
  {
    title: 'Launch Week 8',
    path: '/hackathons/launch-week-8',
    banner: 'launch-week-8.webp',
    start: '4 August 2023 09:00:00 PDT',
    end: '14 August 2023 23:59:59 PDT',
  },
  {
    title: 'Flutter Hackathon',
    path: '/hackathons/flutter-hackathon',
    banner: 'flutter_hackathon.jpg',
    start: '12 May 2023 06:00:00 PDT',
    end: '21 May 2023 23:59:59 PDT',
  },
  {
    title: 'Launch Week 7',
    path: '/hackathons/launch-week-7',
    banner: 'launch-week-7-banner.jpeg',
    start: '7 April 2023 06:00:00 PDT',
    end: '16 April 2023 23:59:59 PDT',
  },
  {
    title: 'Launch Week 6',
    path: '/hackathons/launch-week-6',
    banner: 'hackathon-lw6.jpg',
    start: '9 December 2022 06:00:00 PDT',
    end: '18 December 2022 23:59:59 PDT',
  },
  {
    title: 'Launch Week 5',
    path: '/hackathons/launch-week-5',
    banner: 'launch-week-5-hackathon.jpeg',
    start: '12 August 2022 09:00:00 PDT',
    end: '21 August 2022 23:59:00 PDT',
  },
  {
    title: 'Bring the Func(🕺)',
    path: '/hackathons/bring-the-func',
    banner: 'fx.png',
    start: '1 April 2022 09:00:00 PDT',
    end: '10 April 2022 23:59:00 PDT',
  },
  {
    title: 'Holiday Hackdays',
    path: '/hackathons/holiday-hackdays',
    banner: 'supabase-hackathon-v2.png',
    start: '3 Dec 2021 07:00:00 PDT',
    end: '12 Dec 2021 23:59:00 PDT',
  },
  {
    title: 'Hacktoberfest',
    path: '/hackathons/hacktoberfest',
    banner: 'hacktoberfest.png',
    start: '1 Oct 2020 08:00:00 PDT',
    end: '10 Oct 2020 23:59:00 PDT',
  },
]

function imageUrl(name: string) {
  return new URL(`/assets/${name}`, import.meta.url)
}
</script>

<template>
  <div class="mt-8">
    <ul class="flex flex-col max-w-[34rem] mx-auto space-y-4">
      <li v-for="hackathon in hackathons" :key="hackathon.title">
        <NuxtLink :to="hackathon.path" class="group">
          <div class="border border-gray-700 bg-gray-700 bg-opacity-20 hover:bg-opacity-50 h-full rounded-2xl p-2 transition duration-500 ease-in-out overflow-hidden ">
            <h1 class="text-[15px] mt-1 mb-2 ml-2 text-gray-200 whitespace-pre-wrap">
              {{ hackathon.title }}
            </h1>
            <p class="leading-4 text-[13px] ml-2 mb-3 text-gray-500 group-hover:text-gray-400 transition duration-500">
              {{ dayjs(hackathon.start).tz('America/Los_Angeles').format("D MMM") }} - {{ dayjs(hackathon.end).tz('America/Los_Angeles').format("D MMM YYYY") }}
            </p>

            <div class="rounded-xl mt-2 overflow-hidden ">
              <img class="object-cover h-44 md:h-72 w-full group-hover:scale-[1.03] transition-transform duration-500 ease-in-out" :src="imageUrl(hackathon.banner)" :alt="hackathon.title">
            </div>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
