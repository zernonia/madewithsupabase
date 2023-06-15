<script setup lang="ts">
const hackathons = [
  { title: 'Flutter Hackathon', path: '/hackathons/flutter-hackathon', banner: 'flutter_hackathon.jpg' },
  { title: 'Launch Week 7', path: '/hackathons/launch-week-7', banner: 'launch-week-7-banner.jpeg' },
]

function imageUrl(name: string) {
  return new URL(`/assets/${name}`, import.meta.url)
}
</script>

<template>
  <div>
    Hackathon!!

    <ul>
      <li v-for="hackathon in hackathons" :key="hackathon.title">
        <NuxtLink :to="hackathon.path">
          {{ hackathon.title }}

          <img :src="imageUrl(hackathon.banner)" :alt="hackathon.title">
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
