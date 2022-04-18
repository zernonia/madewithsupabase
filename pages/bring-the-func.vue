<template>
  <main class="py-8">
    <section class="md:py-6 px-4 flex flex-col items-center">
      <a
        href="/"
        class="fixed left-0 top-10 px-4 md:px-6 py-4 rounded-r-full bg-dark-300"
      >
        <i-mdi:chevron-left></i-mdi:chevron-left>
      </a>
      <a
        href="https://supabase.com/blog/2022/04/01/hackathon-bring-the-func"
        target="_blank"
      >
        <img class="w-full md:w-128" :src="HeroImage" alt="" />
      </a>
    </section>

    <section class="w-full md:py-6 flex flex-col items-center">
      <h2
        class="text-4xl md:text-5xl text-center mb-4 sm:mb-16 text-emerald-400"
      >
        Most impressive <br />
        GraphQL project
      </h2>
      <CardWinner :obj="projects[0]">
        <template v-slot:icon>
          <i-simple-icons:graphql
            class="h-24 md:h-36 w-auto absolute -top-10 -right-10 md:-right-24"
            style="color: #fcd33f"
          ></i-simple-icons:graphql>
        </template>
      </CardWinner>
      <CardRunnerUp :obj="projects[1]">
        <template v-slot:icon>
          <i-simple-icons:graphql
            class="h-18 md:h-30 w-auto absolute -top-10 -left-6 md:-left-22"
            style="color: #d1d5db"
          ></i-simple-icons:graphql>
        </template>
      </CardRunnerUp>
    </section>

    <section class="w-full md:py-6 mt-12 md:mt-20 flex flex-col items-center">
      <h2
        class="text-4xl md:text-5xl text-center mb-4 sm:mb-16 text-emerald-400"
      >
        Most interesting usage <br />
        of Edge Functions
      </h2>
      <CardWinner :obj="projects[2]">
        <template v-slot:icon>
          <i-mdi:function-variant
            class="h-24 md:h-36 w-auto absolute -top-10 -right-10 md:-right-24"
            style="color: #fcd33f"
          ></i-mdi:function-variant>
        </template>
      </CardWinner>
      <CardRunnerUp :obj="projects[3]">
        <template v-slot:icon>
          <i-mdi:function-variant
            class="h-18 md:h-30 w-auto absolute -top-10 -left-6 md:-left-22"
            style="color: #d1d5db"
          ></i-mdi:function-variant>
        </template>
      </CardRunnerUp>

      <section class="w-full md:py-6 mt-12 md:mt-20 flex flex-col items-center">
        <h2
          class="text-4xl md:text-5xl text-center mb-4 sm:mb-16 text-emerald-400"
        >
          Most fun/visually pleasing <br />
          (get creative)
        </h2>
        <CardWinner :obj="projects[4]">
          <template v-slot:icon>
            <i-ph:heart-duotone
              class="h-24 md:h-36 w-auto absolute -top-10 -right-14 md:-right-24"
              style="color: #fcd33f"
            ></i-ph:heart-duotone>
          </template>
        </CardWinner>
        <CardRunnerUp :obj="projects[5]">
          <template v-slot:icon>
            <i-ph:heart-duotone
              class="h-18 md:h-30 w-auto absolute -top-10 -left-8 md:-left-22"
              style="color: #d1d5db"
            ></i-ph:heart-duotone>
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
          <div v-if="!isFetching" class="card-grid">
            <Card
              v-for="item in hacktoberfestData"
              :key="item.id"
              :item="item"
            ></Card>
          </div>
          <div v-else class="w-full h-screen flex items-center justify-center">
            <SVGCircle class="animate-ping"></SVGCircle>
          </div>
        </transition>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
definePageMeta({
  layout: "blank",
})
</script>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import HeroImage from "@/assets/fx.svg"
const { $supabase } = useNuxtApp()

const projects = ref([
  {
    id: "67db71ab-867e-403d-8885-991760c29386",
    title: "mintbaseXsupabase",
    subtitle: "@Flowolfpro",
    link: "/p/mintbasexsupabase",
    image:
      "https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/mintbasexsupabase-1dttd-162639349-3f334480-f8a9-4b58-88b1-0a6688a16ffapng",
  },
  {
    id: "80889e84-06ed-44ee-a6d6-637975fa523c",
    title: "Pgm Dictionary",
    subtitle: "@n4ze3m",
    link: "/p/pgm-dictionary",
    image:
      "https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/pgm-26sp1-screenzy-1649267250672png",
  },
  {
    id: "6cf421d5-3a2c-45c2-a220-37d771e24deb",
    title: "Wen NFT",
    subtitle: "@gbibeaul",
    link: "/p/wen-nft",
    image:
      "https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/wen-nft-37xz7-screenshot-2022-04-03-at-19-31-44-web3-fullstackpng",
  },
  {
    id: "68b1d4d6-3bbf-43b9-85e3-fabadce1655d",
    title: "DocuPool - Document Sharing Platform",
    subtitle: "@emilioschepis",
    link: "/p/docupool-document-sharing-platform",
    image:
      "https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/docupool-document-sharing-platform-svuxo-screen-shot-2022-04-10-at-222753png",
  },
  {
    id: "4f482a70-3a46-44f8-b791-ba7325d5f22b",
    title: "AbileneX",
    subtitle: "@okeziechiedozie",
    link: "/p/abilenex-the-revolutionary-idea-feedback-tool",
    image:
      "https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/abilenex-the-revolutionary-idea-feedback-tool-7iaib-cover-imagepng",
  },
  {
    id: "827679e3-feb7-4615-ad67-f07eecb1b540",
    title: "Kardow",
    subtitle: "@SimonGingras18",
    link: "/p/kardow",
    image:
      "https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/kardow-1ust9-kardow-templatepng",
  },
])

// get other submission
const hacktoberfestData = ref<any>([])
const isFetching = ref(true)
const fetchData = async () => {
  isFetching.value = true
  const { data, error } = await $supabase
    .from("bring_the_func_view")
    .select("*")
    .order("views", { ascending: false })
  hacktoberfestData.value = data
  isFetching.value = false
}
fetchData()
</script>
