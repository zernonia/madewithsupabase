<script setup lang="ts">
const client = useSupabase()
const { upsertProjects } = useAllProjects()

const winnerGroup = {
  'Best Overall Project': [
    {
      id: '9352cfc9-c72c-41c4-ad99-bbd0daf21da6',

      title: 'Page Assist',
      subtitle: '@n4ze3m',
      link: '/p/page-assist',
      image:
        'https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/page-assist-bumfu-pika-1681623921336-1xpng',
    },
    {
      id: 'd8a1c0e8-ac25-439a-b5bc-457929d7a01c',
      title: 'rect',
      subtitle: '@JohnVandivier',
      link: '/p/rect',
      image:
        'https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/rect-87lhd-screenshot-2023-04-25-at-82351-ampng',
    },
  ],
  'Best use of AI': [
    {
      id: 'de66b590-7218-42f1-bcc5-6b8d02d46f55',
      title: 'Supathreads',
      subtitle: '@_asheeshh',
      link: '/p/supathreads',
      image:
        'https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/supathreads-a4404-st1jpeg',
    },
    {
      id: '50bc2591-013d-47e7-a370-e8a750788e1b',
      title: 'ChatVox · Chat With Any Video',
      subtitle: '@Jimmy_JingLv',
      link: '/p/chatvox-chat-with-any-video',
      image:
        'https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/chatvox-chat-with-any-video-yvssr-google-chrome-chatvox-chat-with-any-video-006895-20230417png',
    },
  ],
  'Most fun / best easter egg': [
    {
      id: '70604316-f1b1-4419-bbdd-6fbdf8d68cbc',
      title: 'Replay.ai - spotlight search for your browsing history',
      subtitle: '@bhavinkamani_',
      link: '/p/replayai-spotlight-search-for-your-browsing-history',
      image:
        'https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/replay-spotlight-search-for-your-browsing-history-1k7cx-screenshot-2023-04-16-at-50241-pmpng',
    },
    {
      id: 'd47677fd-8768-475d-be19-4244f03d3867',
      title: 'Groove AI - AI Generated Drum Patterns',
      subtitle: '@RealDanRyland',
      link: '/p/groove-ai-ai-generated-drum-patterns',
      image:
        'https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/groove-ai-ai-generated-drum-patterns-v2c9-groove-ai-coverjpeg',
    },
  ],
  'Most technically impressive': [
    {
      id: '6bb48b15-d528-420d-8f75-555e78b31955',
      title: 'Supa0SQL',
      subtitle: '@gpangantes',
      link: '/p/supa0sql',
      image:
        'https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/supa0sql-vm61y-screenshot-2023-04-15-at-232121png',
    },
    {
      id: '50bb1a44-69f2-4621-a479-ba1cdc0bfebe',
      title: 'Schedurio - An open-source tweet Scheduler.',
      subtitle: '@anshrathodfr',
      link: '/p/schedurio-an-open-source-tweet-scheduler',
      image:
        'https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/schedurio-an-open-source-tweet-scheduler-va8hs-screenshot-2023-04-17-at-121632-pmpng',
    },
  ],
  'Most visually pleasing': [
    {
      id: '221b631c-4c8d-45ca-acfb-7d17320f00ce',
      title: 'Generation: Hotdog',
      subtitle: '@laznic',
      link: '/p/generation-hotdog',
      image:
        'https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/generation-hotdog-q21jc-share-imgpng',
    },
    {
      id: 'e0c377f2-57ca-4257-9be7-177c6a2f2579',
      title: 'Tune Twisters',
      subtitle: '@johnphamous',
      link: '/p/tune-twisters',
      image:
        'https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/tune-twisters-wuxc9h-cleanshot-2023-04-17-at-1246232xpng',
    },
  ],
}

const { data, pending } = useLazyAsyncData('launch-week-7-view', async () => {
  const { data, error } = await client
    .from('launch_week_7_view')
    .select('*')
    .order('views', { ascending: false })

  if (data)
    upsertProjects(data)

  return data
})

definePageMeta({
  title: 'Launch Week 7',
  noise_bg_color:
    '60deg,rgba(0, 41, 255, 1),rgba(200, 200, 200, 0.85),rgba(158,68,239, 0.85)',
})
</script>

<template>
  <div>
    <CustomMeta title="Launch Week 7 Hackathon" />

    <div v-for="(winners, key) of winnerGroup">
      <h2 class="mt-12 mb-4 text-3xl">
        {{ key }}
      </h2>
      <ul class="grid lg:grid-cols-2 gap-6 xl:gap-12 p-0 m-0 w-full">
        <li
          v-for="(winner, index) in winners"
          class="mb-6 w-full relative p-6 xl:p-12 rounded-3xl bg-gradient-to-r from-dark-500 via-dark-100 to-dark-900 overflow-hidden hover:scale-102 transition duration-700"
        >
          <NuxtLink :to="winner.link">
            <div class="flex flex-col">
              <h5 class="text-2xl md:text-3xl">
                <span> {{ index === 0 ? "🥇" : "🥈" }} </span>

                {{ winner.title }}
              </h5>
              <h6 class="text-sm text-light-900 mt-1">
                {{ winner.subtitle }}
              </h6>
            </div>

            <CompressedImage
              class="rounded-2xl mt-6"
              :alt="winner.title"
              :src="winner.image"
            />
          </NuxtLink>
        </li>
      </ul>
    </div>

    <div class="card-grid mt-12">
      <Card v-for="item in data" :key="item.id?.toString()" :item="item" />
    </div>
  </div>
</template>

<style scoped lang="postcss">
:deep(.btn),
:deep(.tag-btn) {
  @apply px-8 py-3 bg-purple-400 hover:bg-purple-500 border-none;
}
:deep(input),
:deep(textarea) {
  border-radius: 0.5rem;
  @apply border-none placeholder-cool-gray-300;
}
:deep(form > div:nth-child(8) > div div) {
  @apply border-0;
}
:deep(form > div.\!my-8.px-6.py-4.bg-dark-600.rounded-lg) {
  @apply bg-purple-500 bg-opacity-50;
}
:deep(input[type="checkbox"]) {
  @apply mt-0 bg-purple-600;
}
</style>
