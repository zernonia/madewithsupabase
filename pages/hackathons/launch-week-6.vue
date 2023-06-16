<script setup lang="ts">
const client = useSupabase()

const winnerGroup = {
  'Best Overall Project': [
    {
      id: '6217a5bb-08a7-49b7-b489-62b6c9b89c6c',

      title: 'Depulso',
      subtitle: '@_iamkarthikeyan, @SindhuMansi',
      link: '/p/depulso',
      image:
        'https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/depulso-6luxd-screenshot-2022-12-19-at-132424png',
    },
    {
      id: 'd3e34023-b1a5-4ddb-8e04-caa42d20af0e',
      title: 'Supa Sql App',
      subtitle: '@luis_rodge',
      link: '/p/supa-sql-app',
      image:
        'https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/supa-sql-app-3d33jf-screen-shot-2022-12-18-at-51957-pmpng',
    },
  ],
  'Most Fun/Interesting': [
    {
      id: 'f1f18b82-4d96-4ab7-80db-9f814b6e428b',
      title: 'http-sense',
      subtitle: '@tchyut_p',
      link: '/p/http-sense',
      image:
        'https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/http-sense-gs9mf-screen-shot-2022-12-19-at-120553-pmpng',
    },
    {
      id: 'e8dbe6d5-3f2a-4b95-86d5-5849a9f4d1ba',
      title: 'supabase-js-rs',
      subtitle: '@wa1aric',
      link: '/p/supabase-js-rs',
      image:
        'https://supabase.com/_next/image?url=%2Fimages%2Fblog%2Flw6-hackathon-winners%2Fsupabase-js-rs.png&w=1920&q=75',
    },
  ],
  'Best Flutter Project': [
    {
      id: '5a74a233-9bd7-4ce5-9c4e-01b86696675',
      category: '',
      position: 'Winner',
      title: 'Supaquiz',
      subtitle: '@yallurium',
      link: '/p/supaquiz-multiplayer-trivia-quiz-game',
      image:
        'https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/supaquiz-multiplayer-trivia-quiz-game-ieg4m-title-screenpng',
    },
  ],
  'Best Storage Project': [
    {
      id: 'fc1366ba-303d-48d8-bf00-88fff933d134',
      title: 'Lookout',
      subtitle: '@Amanrk28, @nithsua, @_harisaran_, @sabeshbharathi',
      link: '/p/lookout',
      image:
        'https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/lookout-1w901k-screenshot-2022-12-19-at-12733-pmpng',
    },
    {
      id: 'df7e0b3e-bf78-4ee1-b93d-9887449a2577',
      title: 'Penelope AI',
      subtitle: '@taishik_',
      link: '/p/penelope-ai-unleash-the-power-of-your-writing-with-the-most-sophisticated-ai-writing-assistant',
      image:
        'https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/penelope-ai-unleash-the-power-of-your-writing-with-the-most-sophisticated-ai-writing-assistant-lkjh6-xnapper-2022-12-15-211346png',
    },
  ],
  'Best Edge Functions Project': [
    {
      id: '59be8ec0-0452-40b4-a888-4fcc046ed9ff',
      title: 'Vista',
      subtitle: '@zernonia',
      link: '/p/vista',
      image:
        'https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/vista-5sjbu-screenshot-2022-12-19-at-113852-ampng',
    },
    {
      id: '00a4a936-d229-42fc-8954-ed5851204c6a',
      title: 'Supa Que',
      subtitle: '@suciptodev',
      link: '/p/supa-que',
      image:
        'https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/supa-que-mfdyj-screenshot-2022-12-19-at-145405png',
    },
  ],
}

const { data, pending } = useLazyAsyncData('launch-week-6-view', async () => {
  const { data, error } = await client
    .from('launch_week_6_view')
    .select('*')
    .order('views', { ascending: false })

  return data
})

definePageMeta({
  layout: 'blank',
})
</script>

<template>
  <CustomMeta title="Launch Week 6 Hackathon" />
  <div class="relative">
    <NuxtLink
      to="/hackathons"
      class="fixed left-6 top-18 p-3 rounded-full bg-gray-400 border border-gray-300"
    >
      <div class="i-mdi:chevron-left text-2xl" />
    </NuxtLink>

    <div class="flex items-center mt-12">
      <h1 class="text-4xl">
        Launch Week 6 Hackathon
      </h1>

      <NuxtLink
        to="https://supabase.com/blog/launch-week-6-hackathon-winners"
        target="_blank"
        class="ml-4 text-xl"
      >
        <div class="i-mdi-arrow-top-right-thin" />
      </NuxtLink>
    </div>

    <div v-for="(winners, key) of winnerGroup" :key="key">
      <h2 class="mt-12 mb-4 ml-6 text-xl">
        {{ key }}
      </h2>
      <ul class="p-0 m-0 w-full">
        <li
          v-for="(winner, index) in winners"
          :key="index"
          class="group mb-6 w-full relative p-12 rounded-3xl bg-gradient-to-br from-gray-900 via-gray-900 border border-gray-700 overflow-hidden"
          :class="[index === 0 ? 'to-yellow-900' : 'to-gray-700']"
        >
          <div class="flex flex-col">
            <h5 class="text-3xl">
              {{ winner.title }}
            </h5>
            <h6 class="text-sm text-white mt-1">
              {{ winner.subtitle }}
            </h6>

            <NuxtLink
              class="btn my-6 md:mt-40 w-max !text-sm md:opacity-0 group-hover:opacity-100"
              :to="winner.link"
            >
              Read more
            </NuxtLink>
          </div>

          <div class="md:w-[30rem] md:absolute bottom-0 right-16">
            <div
              class="relative flex-shrink-0 max-h-[18rem] rounded-t-xl border border-gray-700"
            >
              <CompressedImage
                class="rounded-lg"
                :alt="winner.title"
                :src="winner.image"
              />
            </div>
          </div>
        </li>
      </ul>

      <div class="my-12 h-[1px] w-full bg-gray-300" />
    </div>

    <transition name="fade" mode="out-in">
      <div v-if="!pending" class="card-grid">
        <Card
          v-for="item in data"
          :key="item.id?.toString()"
          :item="item"
        />
      </div>
      <div v-else class="w-full h-screen flex items-center justify-center">
        <SVGCircle class="animate-ping" />
      </div>
    </transition>
  </div>
</template>

<style scoped lang="postcss">
:deep(.btn) {
  @apply bg-gray-800 rounded-full font-normal text-base border border-gray-700 hover:border-white;
}
</style>
