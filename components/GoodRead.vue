<script setup lang="ts">
const links = ref([
  {
    title: "How I Migrated 1000+ Users from Firebase to Supabase",
    description:
      "When beginning my journey as a Flutter developer, I thought Firebase would be the best backend solution for Flutter. Given that both are made by Google, I thought this would be the backend that would be the most stable and flexible.",
    image: "https://www.fleetingnotes.app/favicon/512.png",
    url: "https://fleetingnotes.app/posts/migrating-from-firebase-to-supabase/",
  },
  {
    title: "How we leverage supabase to build snappify",
    description:
      "supabase enables us to validate our product ideas, get things done quickly, save valuable time and all that for free.",
    image:
      "https://snappify.io/images/blog/covers/how-we-leverage-supabase.png",
    url: "https://snappify.io/blog/how-we-leverage-supabase",
  },
  {
    title:
      "How Mike Lyndon is using Supabase to accelerate development of AllPullTogether",
    description:
      "Mike Lyndon is learning web development as he builds AllPullTogether, and Supabase is helping him accelerate what he can accomplish.",
    image:
      "https://supabase.com/images/blog/all-pull-together/all-pull-together-thumb.png",
    url: "https://supabase.com/blog/how-supabase-accelerates-development-of-all-pull-together",
  },
  {
    title: "Migrating 125.000 users from Auth0 to Supabase",
    description:
      "Over the course of a few weeks, we gradually migrated 125k users with social auth and email+password logins from Auth0 to Supabase, including a webapp, native iOS app and a single-sign-on service…",
    image: "https://miro.medium.com/max/1200/1*yYOY9bLIOq2aSN23VarGcQ.png",
    url: "https://kevcodez.medium.com/migrating-125-000-users-from-auth0-to-supabase-81c0568de307",
  },
])
</script>

<template>
  <div class="mt-16 sm:mt-24">
    <ul class="pl-0 grid lg:grid-cols-2 gap-6">
      <li
        v-for="link in links"
        class="bg-dark-500 bg-opacity-20 rounded-xl p-4 hover:scale-110 transition duration-500 ease-in-out overflow-hidden shadow-2xl"
      >
        <NuxtLink
          :to="link.url"
          target="_blank"
          class="flex flex-col-reverse md:flex-row"
        >
          <div class="md:mr-6">
            <h5 class="md:text-lg">{{ link.title }}</h5>
            <p class="text-sm text-light-900 mt-2">
              {{ link.description }}
            </p>
          </div>
          <NuxtImg
            class="rounded w-20 h-20 object-cover flex-shrink-0 mb-4"
            :src="link.image"
          ></NuxtImg>
        </NuxtLink>
      </li>
    </ul>

    <div class="flex justify-center mt-12">
      <NuxtLink
        to="https://supabase.com/blog/tags/case-study"
        target="_blank"
        class="text-light-900 underline-offset-4 hover:underline hover:text-emerald-500 transition"
        >More use cases</NuxtLink
      >
    </div>
  </div>
</template>
