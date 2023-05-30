<script setup lang="ts">

const client = useSupabase()
const { upsertProjects } = useAllProjects()




const winnerGroup = {
  "Best Overall Project": [
    {
      "title": "Syno",
      "id": "2172950e-12c6-4ae2-940f-a361cc708a0b",
      "twitter": "samuelP09301972",
      "images": "https://supabase.com/_next/image?url=%2Fimages%2Fblog%2Fflutter-hackathon-winners%2Fsyno.jpg&w=1920&q=75",
      "slug": "syno-ai-youtube-summarizer-app",

    },
    {
      "title": "Study Genius",
      "id": "80e3dcfb-56f8-4ec7-a521-afac3ea1d2a0",
      "twitter": "salomon_diei",
      "images": "https://supabase.com/_next/image?url=%2Fimages%2Fblog%2Fflutter-hackathon-winners%2Fstudy-genius.jpg&w=1920&q=75",
      "slug": "study-genius",
    },
  ],
  "Best FlutterFlow Project": [
    {
      "title": "Lord Of The Memes",
      "id": "b1ed5262-b829-49a2-baae-3b6f9fcbcabc",
      "twitter": "mohonishc",
      "images": "https://supabase.com/_next/image?url=%2Fimages%2Fblog%2Fflutter-hackathon-winners%2Flord-of-the-memes.jpg&w=1920&q=75",
      "slug": "lord-of-the-memes",
    },
    {
      "title": "Colabity",
      "id": "beca1f73-5703-4270-9b9d-ee1cf39accfd",
      "twitter": "hichamics",
      "images": "https://supabase.com/_next/image?url=%2Fimages%2Fblog%2Fflutter-hackathon-winners%2Fcolabity.jpg&w=1920&q=75",
      "slug": "colabity",
    },
  ],
  "Best Dart Edge Project": [
    {
      "title": "ChatGlobe",
      "id": "894af72a-9832-49e8-b115-07f88ee3b9b6",
      "twitter": "tomohiko-tanihata",
      "images": "https://supabase.com/_next/image?url=%2Fimages%2Fblog%2Fflutter-hackathon-winners%2Fchatglobe.jpg&w=1920&q=75",
      "slug": "chatglobe",
    },
    {
      "title": "Adventure Kingdom",
      "id": "b4a94161-6a75-4784-b608-cffb1d3e66d4",
      "twitter": "anujeshd",
      "images": "https://supabase.com/_next/image?url=%2Fimages%2Fblog%2Fflutter-hackathon-winners%2Fadventure-kingdom.jpg&w=1920&q=75",
      "slug": "adventure-kingdom-theme-park-information-ticketbooking-app",
    }
  ],
  "Most technically impressive": [
    {
      "title": "Accident Detection",
      "id": "c97450aa-1346-4c64-a22e-2ebd40e2af43",
      "twitter": "Guneetsingh02",
      "images": 'https://supabase.com/_next/image?url=%2Fimages%2Fblog%2Fflutter-hackathon-winners%2Faccident-detection.jpg&w=1920&q=75',
      "slug": "accident-detection",
    },
    {
      "title": "IntelliTask",
      "id": "a00a15bf-420e-4469-866d-bbfc3f5591f7",
      "twitter": "noga_dev",
      "images": "https://supabase.com/_next/image?url=%2Fimages%2Fblog%2Fflutter-hackathon-winners%2Fintellitask.jpg&w=1920&q=75",
      "slug": "intellitask",
    }
  ],
  "Most visually pleasing": [
    {
      "title": "Caffeio",
      "id": "6ccc0c53-1191-41ef-b40c-21fc4bcd80ad",
      "twitter": "caurregoz",
      "images": "https://supabase.com/_next/image?url=%2Fimages%2Fblog%2Fflutter-hackathon-winners%2Fcaffeio.jpg&w=1920&q=75",
      "slug": "caffeio",
    },
    {
      "title": "Decision Tales",
      "id": "c93608ff-f668-4430-8219-64a5508e0dd3",
      "twitter": "JudoUergens",
      "images": "https://supabase.com/_next/image?url=%2Fimages%2Fblog%2Fflutter-hackathon-winners%2Fdecision-tales.jpg&w=1920&q=75",
      "slug": "decision-tales",
    },
  ],
}

const { data, pending } = useLazyAsyncData("flutter_hackathon_view", async () => {
  const { data, error } = await client
    .from("flutter_hackathon_view")
    .select("*")
    .order("views", { ascending: false })

  const winnersId = Object.values(winnerGroup).flat().map(i => i.id)

  if (data) upsertProjects(data)

  return data?.filter(i => !winnersId.includes(i.id ?? ""))
})

definePageMeta({
  title: "Flutter Hackathon",
  noise_bg_color: "60deg,rgb(46 42 50),rgb(0 0 0 / 75%),rgb(25 47 160)",
})
</script>

<template>
  <div>
    <CustomMeta :title="'Flutter Hackathon'" />
    <main class="py-8">
      <section class="md:py-6 flex flex-col items-center">
        <div class="w-full md:w-auto">
          <NuxtLink to="https://supabase.com/blog/flutter-hackathon-winners" target="_blank"
            class="group relative h-80 sm:h-90 lg:h-120 w-full flex flex-col justify-center items-center transition-all duration-750 rounded-2xl md:rounded-3xl relative border-10 border-dark-500 border-opacity-10 overflow-hidden hover:scale-105">
            <img src="~~/assets/flutter-hackathon-winners.webp" alt="Supabase Flutter Hackathon Winners"
              class="w-full h-full object-cover transition duration-750 scale-100 group-hover:scale-110"
              style="object-position: center 68%" />
          </NuxtLink>
        </div>
      </section>
      <div v-for="(winners, key) of winnerGroup">
        <h2 class="mt-12 mb-4 text-3xl">{{ key }}</h2>
        <ul class="grid lg:grid-cols-2 gap-6 xl:gap-12 p-0 m-0 w-full">
          <li v-for="(winner, index) in winners"
            class="mb-6 w-full h-max relative p-6 xl:p-12 rounded-3xl bg-dark-900 bg-opacity-20 overflow-hidden hover:scale-102 transition duration-700">
            <NuxtLink :to="`/p/${winner.slug}`">
              <div class="flex flex-col">
                <h5 class="text-2xl md:text-3xl">
                  <span> {{ index === 0 ? "🥇" : "🥈" }} </span> {{ winner.title }}
                </h5>
                <h6 class="text-sm text-light-900 mt-1">{{ winner.twitter }}</h6>
              </div>
              <img class="rounded-2xl mt-6" :alt="winner.title" :src="winner.images" />
            </NuxtLink>
          </li>
        </ul>
      </div>
      <h2 class="mt-12 mb-4 text-3xl">Submissions</h2>
      <div class="card-grid mt-12">
        <Card v-for="item in data" :key="item.id?.toString()" :item="item"></Card>
      </div>
    </main>
  </div>
</template>

<style scoped lang="postcss">
:deep(.btn) {
  @apply bg-violet-800 hover: bg-violet-900 opacity-100 rounded-xl font-normal text-base border-2 border-violet-800 hover:border-white shadow hover:shadow-xl;
}
</style>
