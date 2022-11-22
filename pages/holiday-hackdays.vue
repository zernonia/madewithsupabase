<template>
  <div>
    <CustomMeta :title="'Holiday Hackdays Announcement'" />

    <main class="py-8">
      <section class="md:py-6 px-4 flex flex-col items-center">
        <NuxtLink to="/">
          <img class="w-12 sm:w-16" :src="SiteLogo" alt="" />
        </NuxtLink>
        <div class="px-1 mt-12 h-36 md:h-52 w-full max-w-screen-lg rounded-lg">
          <div class="relative flex h-full w-full">
            <a
              href="https://supabase.com/blog/2021/12/03/supabase-holiday-hackdays-hackathon"
              rel="noopener"
              target="_blank"
              class="z-10 absolute w-full h-full flex justify-center items-center bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden"
            >
              <img class="w-full h-full object-cover" :src="HeroImage" alt="" />
            </a>
            <div
              class="absolute w-full h-full bg-conic-gradient filter blur-xl"
            ></div>
            <div
              class="absolute w-full h-full bg-conic-gradient filter blur-3xl opacity-60 animate-pulse-slow"
            ></div>
            <div class="absolute -inset-1 rounded-lg bg-conic-gradient"></div>
          </div>
        </div>
      </section>
    </main>

    <section class="w-full md:py-6 flex flex-col items-center">
      <h2
        class="text-4xl md:text-5xl text-center mb-4 sm:mb-16 text-emerald-400"
      >
        Best Overall Project
      </h2>
      <CardWinner :obj="projects[0]">
        <template v-slot:icon>
          <i-mdi:star-four-points
            class="h-24 md:h-36 w-auto absolute -top-16 -right-10 md:-right-24"
            style="color: #fcd33f"
          ></i-mdi:star-four-points>
        </template>
      </CardWinner>
      <CardRunnerUp :obj="projects[1]">
        <template v-slot:icon>
          <i-mdi:star-four-points
            class="h-18 md:h-30 w-auto absolute -top-10 -left-8 md:-left-22"
            style="color: #d1d5db"
          ></i-mdi:star-four-points>
        </template>
      </CardRunnerUp>
    </section>

    <section class="w-full md:py-6 mt-12 md:mt-20 flex flex-col items-center">
      <h2
        class="text-4xl md:text-5xl text-center mb-4 sm:mb-16 text-emerald-400"
      >
        Best Realtime Project
      </h2>
      <CardWinner :obj="projects[2]">
        <template v-slot:icon>
          <i-mdi:timelapse
            class="h-24 md:h-36 w-auto absolute -top-16 -right-10 md:-right-24"
            style="color: #fcd33f"
          ></i-mdi:timelapse>
        </template>
      </CardWinner>
      <CardRunnerUp :obj="projects[3]">
        <template v-slot:icon>
          <i-mdi:timelapse
            class="h-18 md:h-30 w-auto absolute -top-10 -left-6 md:-left-22"
            style="color: #d1d5db"
          ></i-mdi:timelapse>
        </template>
      </CardRunnerUp>

      <section class="w-full md:py-6 mt-12 md:mt-20 flex flex-col items-center">
        <h2
          class="text-4xl md:text-5xl text-center mb-4 sm:mb-16 text-emerald-400"
        >
          Best Christmas Themed
        </h2>
        <CardWinner :obj="projects[4]">
          <template v-slot:icon>
            <i-whh:christmasstree
              class="h-24 md:h-36 w-auto absolute -top-10 -right-14 md:-right-24"
              style="color: #fcd33f"
            ></i-whh:christmasstree>
          </template>
        </CardWinner>
        <CardRunnerUp :obj="projects[5]">
          <template v-slot:icon>
            <i-whh:christmasstree
              class="h-18 md:h-30 w-auto absolute -top-10 -left-8 md:-left-22"
              style="color: #d1d5db"
            ></i-whh:christmasstree>
          </template>
        </CardRunnerUp>
      </section>

      <section class="w-full md:py-6 mt-12 md:mt-20 flex flex-col items-center">
        <h2
          class="text-4xl md:text-5xl text-center mb-4 sm:mb-16 text-emerald-400"
        >
          Most Visually Pleasing
        </h2>
        <CardWinner :obj="projects[6]">
          <template v-slot:icon>
            <i-ic:baseline-auto-awesome
              class="h-24 md:h-36 w-auto absolute -top-10 -right-14 md:-right-24"
              style="color: #fcd33f"
            ></i-ic:baseline-auto-awesome>
          </template>
        </CardWinner>
        <CardRunnerUp :obj="projects[7]">
          <template v-slot:icon>
            <i-ic:baseline-auto-awesome
              class="h-18 md:h-30 w-auto absolute -top-10 -left-10 md:-left-22"
              style="color: #d1d5db"
            ></i-ic:baseline-auto-awesome>
          </template>
        </CardRunnerUp>
      </section>
    </section>

    <section class="mt-12 md:mt-20">
      <div>
        <h2
          class="text-4xl md:text-5xl text-center mb-4 sm:mb-16 text-emerald-400"
        >
          Other Submission
        </h2>
        <transition name="fade" mode="out-in">
          <div v-if="!pending" class="card-grid">
            <Card
              v-for="item in data"
              :key="item.id?.toString()"
              :item="item"
            ></Card>
          </div>
          <div v-else class="w-full h-screen flex items-center justify-center">
            <SVGCircle class="animate-ping"></SVGCircle>
          </div>
        </transition>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import SiteLogo from "@/assets/logo.svg"
import HeroImage from "@/assets/supabase-hackathon-v2.png"
const client = useSupabase()

definePageMeta({
  layout: "blank",
})

const projects = ref([
  {
    id: "457bf554-9a37-45ae-ae12-f19e8354bb0b",
    title: "Swappy.one",
    subtitle: "@zernonia",
    link: "/p/swappyone",
    image:
      "https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/Swappy.one-rsx33-Frame 30.png",
  },
  {
    id: "20b57673-5787-4fe9-ab65-e72f5341aad4",
    title: "Chivel",
    subtitle: "@lalitcodes",
    link: "/p/chivel",
    image:
      "https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/Chivel-a03sx-ogimage.png",
  },
  {
    id: "0873cbc4-0a83-4473-b1d8-996e19b29a8f",
    title: "RT Poll - Realtime Polls",
    subtitle: "@emilioschepis",
    link: "/p/rt-poll-realtime-polls",
    image:
      "https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/RT Poll - Realtime Polls-bpl8s-rtpoll-rt.png",
  },
  {
    id: "dc3469a5-7e93-4136-b56e-51f48ce37d61",
    title: "End-to-end encrypted chat",
    subtitle: "@arnu5152",
    link: "/p/end-to-end-encrypted-chat",
    image:
      "https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/End-to-end encrypted chat-eap1qg-Screenshot from 2021-12-12 14-32-08.png",
  },
  {
    id: "2e14820c-2323-4db4-a036-be4961a619d5",
    title: "Santa Banter",
    subtitle: "@AndyKeogh",
    link: "/p/santa-banter",
    image:
      "https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/Santa Banter -dc8wef-Screenshot 2021-12-07 at 09.59.08.png",
  },
  {
    id: "06f39c78-3b0d-4ebe-9ead-31c26782f075",
    title: "Holiday Sweater Contest",
    subtitle: "@mtwichel",
    link: "/p/holiday-sweater-contest",
    image:
      "https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/Holiday Sweater Contest-pjm3r-Screen Shot 2021-12-12 at 10.52.24 PM.png",
  },
  {
    id: "056778b9-414a-41fe-924d-42d917c637f9",
    title: "Beauty Wishlist",
    subtitle: "@glowdexapp",
    link: "/p/beauty-wishlist",
    image:
      "https://dohemiycqebeipbvsvnr.supabase.in/storage/v1/object/public/products/thegetlist.png",
  },
  {
    id: "38c4fb84-139a-4c86-946d-f8db45c8b519",
    title: "Card Creator",
    subtitle: "@maggie",
    link: "/p/card-creator",
    image:
      "https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/Card Creator-vs9hc-Screen Shot 2021-12-12 at 11.12.23 PM.png",
  },
])

const { data, pending } = useLazyAsyncData("hacktoberfest", async () => {
  const { data, error } = await client
    .from("hacktoberfest_view")
    .select("*")
    .order("views", { ascending: false })
  return data
})
</script>
