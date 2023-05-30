<script lang="ts">
</script>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import lottie from 'lottie-web'

definePageMeta({
  layout: 'blank',
})
const client = useSupabase()

const projects = ref([
  {
    id: '633da892-5329-417d-8f39-de4ce2dc0f85',
    title: 'Pickle',
    subtitle: '@alizahid0',
    link: '/p/pickle',
    image:
      'https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/Pickle-hne7v-pickle-supabase.png',
  },
  {
    id: '92ee5660-5034-4e03-a0d1-f7ac0c2b2000',
    title: 'og:supa',
    subtitle: '@jnnksbrt',
    link: '/p/og-supa',
    image:
      'https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/og:supa-x2uen-ogimage.png',
  },
  {
    id: 'e6511092-4f14-4071-a97d-c00997107a7d',
    title: 'CourseBuddy',
    subtitle: '@seufernandez',
    link: '/p/coursebuddy-app',
    image:
      'https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/CourseBuddy App-mx0duj-coursebuddyHome.png',
  },
  {
    id: '4ce9493a-f4b4-4f44-9165-17533c4eaa4c',
    title: 'Relm',
    subtitle: '@imsaptarshiii',
    link: '/p/relm',
    image:
      'https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/Relm-evfyf-cover.png',
  },
  {
    id: 'c77204bb-467d-4007-8074-d0333797760e',
    title: 'Feedback Widget',
    subtitle: '@drmzio',
    link: '/p/feedback-widget',
    image:
      'https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/Feedback Widget-l0f4m-screenshot.jpg',
  },
  {
    id: 'bbf730ef-1ca0-41fb-920b-7af6bc6b2d78',
    title: 'Party Parrot as a Service',
    subtitle: '@c00brill, @theJayKhatri, @JohnPhamous',
    link: '/p/party-parrot-as-a-service',
    image:
      'https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/Party Parrot as a Service-4l2rt-hero.png',
  },
  {
    id: '3568ac14-7e56-4246-979b-dfc8f4ee9456',
    title: 'Utility Manager',
    subtitle: '@KathirvelChandrasekaran',
    link: '/p/utility-manager-flutter-application',
    image:
      'https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/Utility Manager Flutter Application-np8yo-Utility Manager Flutter Application.png',
  },
  {
    id: '1f840090-511a-430e-b4d2-8370fa35150b',
    title: 'TLWR',
    subtitle: '@Aqudi, croquies',
    link: '/p/tlwr-the-long-and-winding-road-visualize-users-routing-paths',
    image:
      'https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/TLWR (The Long and Winding Road): Visualize User\'s Routing Paths-4un5r-sample_image.png',
  },
  {
    id: '62f2fb1f-0e27-43b5-91a1-e0a2390e2b4f',
    title: 'Spookd',
    subtitle: '@netgfx',
    link: '/p/spookd',
    image:
      'https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/Spookd-wu9m4-image (14).png',
  },
  {
    id: '8e2789a6-8254-41af-8815-8cde592bab7e',
    title: 'uwudaily',
    subtitle: '@maggie-j-liu, @sampoder, and @eilla1',
    link: '/p/uwudaily',
    image:
      'https://dohemiycqebeipbvsvnr.supabase.co/storage/v1/object/public/products/uwudaily-l3ny0g-ogimage.png',
  },
])
const prizes = ref()
onMounted(() => {
  lottie.loadAnimation({
    container: prizes.value,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: './prizes.json',
  })
})

const { data: hacktoberfestData, pending } = useLazyAsyncData(
  'hacktoberfest',
  async () => {
    const { data, error } = await client
      .from('hacktoberfest_view')
      .select('*')
      .order('views', { ascending: false })
    return data
  },
)
</script>

<template>
  <main class="py-8">
    <section class="md:py-6 px-4 flex flex-col items-center">
      <NuxtLink to="/">
        <img class="w-12 sm:w-16" src="@/assets/logo.svg" alt="">
      </NuxtLink>
      <IconHacktoberfest
        class="pt-8 sm:pt-12 h-auto w-full sm:w-8/10 md:w-6/10"
      />
      <div
        ref="prizes"
        class="h-64 md:h-full w-64 md:w-128 transform -translate-y-20"
      />
    </section>

    <section class="w-full md:py-6 flex flex-col items-center">
      <h2
        class="text-4xl md:text-5xl text-center mb-4 sm:mb-16 text-emerald-400"
      >
        Best Overall Project
      </h2>
      <CardWinner :obj="projects[0]" />
      <CardRunnerUp :obj="projects[1]" />
    </section>

    <section class="w-full md:py-6 mt-12 md:mt-20 flex flex-col items-center">
      <h2
        class="text-4xl md:text-5xl text-center mb-4 sm:mb-16 text-emerald-400"
      >
        Most Visually Pleasing
      </h2>
      <CardWinner :obj="projects[2]">
        <template #icon>
          <i-fa:magic
            class="h-24 md:h-36 w-auto absolute -top-10 -right-10 md:-right-24"
            style="color: #fcd33f"
          />
        </template>
      </CardWinner>
      <CardRunnerUp :obj="projects[3]">
        <template #icon>
          <i-fa:magic
            class="h-18 md:h-30 transform -rotate-90 w-auto absolute -top-10 -left-6 md:-left-22"
            style="color: #d1d5db"
          />
        </template>
      </CardRunnerUp>

      <section class="w-full md:py-6 mt-12 md:mt-20 flex flex-col items-center">
        <h2
          class="text-4xl md:text-5xl text-center mb-4 sm:mb-16 text-emerald-400"
        >
          Most Technically Impressive
        </h2>
        <CardWinner :obj="projects[4]">
          <template #icon>
            <i-heroicons-solid:chip
              class="h-24 md:h-36 w-auto absolute -top-10 -right-14 md:-right-24"
              style="color: #fcd33f"
            />
          </template>
        </CardWinner>
        <CardRunnerUp :obj="projects[5]">
          <template #icon>
            <i-heroicons-solid:chip
              class="h-18 md:h-30 transform -rotate-90 w-auto absolute -top-10 -left-8 md:-left-22"
              style="color: #d1d5db"
            />
          </template>
        </CardRunnerUp>
      </section>

      <section class="w-full md:py-6 mt-12 md:mt-20 flex flex-col items-center">
        <h2
          class="text-4xl md:text-5xl text-center mb-4 sm:mb-16 text-emerald-400"
        >
          Best mobile project
        </h2>
        <CardWinner :obj="projects[6]">
          <template #icon>
            <i-simple-icons:appstore
              class="h-24 md:h-36 w-auto absolute -top-10 -right-14 md:-right-24"
              style="color: #fcd33f"
            />
          </template>
        </CardWinner>
        <CardRunnerUp :obj="projects[7]">
          <template #icon>
            <i-simple-icons:appstore
              class="h-18 md:h-30 w-auto absolute -top-10 -left-10 md:-left-22"
              style="color: #d1d5db"
            />
          </template>
        </CardRunnerUp>
      </section>

      <section class="w-full md:py-6 mt-12 md:mt-20 flex flex-col items-center">
        <h2
          class="text-4xl md:text-5xl text-center mb-4 sm:mb-16 text-emerald-400"
        >
          Most Spooky/Fun
        </h2>
        <CardWinner :obj="projects[8]">
          <template #icon>
            <svg
              class="h-24 md:h-36 w-auto absolute transition-all -top-0 group-hover:-top-14 -right-0 group-hover:-right-18 group-hover:md:-right-30"
              xmlns="http://www.w3.org/2000/svg"
              width="512"
              height="512"
              viewBox="0 0 330.063 330.063"
            >
              <path
                d="M100.656,329.996c11.712,0,23.065-2.684,33.866-7.993c9.697,5.308,19.924,7.991,30.509,7.991   c10.521,0,20.691-2.653,30.341-7.9c10.802,5.293,22.156,7.969,33.866,7.969c28.011,0,53.947-15.319,73.033-43.135   c17.901-26.089,27.76-60.502,27.76-96.9c0-36.396-9.858-70.809-27.76-96.898c-19.086-27.816-45.023-43.135-73.033-43.135   c-11.686,0-23.018,2.665-33.8,7.937c-0.463-0.252-0.929-0.494-1.393-0.734l31.593-31.589c5.857-5.858,5.858-15.355,0.001-21.213   c-5.858-5.859-15.354-5.858-21.214-0.002l-45.979,45.973c-8.188,0.905-16.259,3.48-23.907,7.633   c-10.811-5.315-22.175-8.004-33.883-8.004c-27.971,0-53.868,15.319-72.921,43.135C9.87,119.21,0.031,153.611,0.031,189.996   c0,36.385,9.839,70.786,27.704,96.866C46.788,314.677,72.686,329.996,100.656,329.996z M182.041,152.135l20-34.641   c2.68-4.641,7.631-7.5,12.99-7.5c5.359,0,10.311,2.859,12.99,7.5l19.626,33.993c1.521,2.346,2.403,5.144,2.403,8.147   c0,8.284-6.715,15-15,15c-0.005-0.001-0.013-0.001-0.02,0h-40c-5.359,0-10.311-2.859-12.99-7.5S179.361,156.776,182.041,152.135z    M82.041,152.135l20-34.641c2.68-4.641,7.631-7.5,12.99-7.5c5.359,0,10.311,2.859,12.99,7.5l19.626,33.993   c1.521,2.346,2.403,5.144,2.403,8.147c0,8.284-6.715,15-15,15c-0.005-0.001-0.014-0.001-0.02,0h-40c-5.359,0-10.31-2.859-12.99-7.5   S79.361,156.776,82.041,152.135z M81.02,201.503c5.094-4.994,13-5.71,18.908-1.71c19.248,13.028,41.76,19.915,65.104,19.915   c23.344,0,45.855-6.887,65.104-19.915c5.908-3.999,13.814-3.283,18.908,1.71c5.094,4.993,5.968,12.883,2.088,18.87   c-19.007,29.332-51.193,46.843-86.1,46.843c-34.906,0-67.093-17.511-86.1-46.843C75.052,214.386,75.926,206.496,81.02,201.503z"
                fill="#fcd33f"
              />
            </svg>
          </template>
        </CardWinner>
        <CardRunnerUp :obj="projects[9]">
          <template #icon>
            <svg
              class="h-18 md:h-30 w-auto absolute transition-all -top-0 group-hover:-top-14 -left-0 group-hover:-left-12 group-hover:md:-left-26"
              xmlns="http://www.w3.org/2000/svg"
              width="512"
              height="512"
              viewBox="0 0 330.063 330.063"
            >
              <path
                d="M100.656,329.996c11.712,0,23.065-2.684,33.866-7.993c9.697,5.308,19.924,7.991,30.509,7.991   c10.521,0,20.691-2.653,30.341-7.9c10.802,5.293,22.156,7.969,33.866,7.969c28.011,0,53.947-15.319,73.033-43.135   c17.901-26.089,27.76-60.502,27.76-96.9c0-36.396-9.858-70.809-27.76-96.898c-19.086-27.816-45.023-43.135-73.033-43.135   c-11.686,0-23.018,2.665-33.8,7.937c-0.463-0.252-0.929-0.494-1.393-0.734l31.593-31.589c5.857-5.858,5.858-15.355,0.001-21.213   c-5.858-5.859-15.354-5.858-21.214-0.002l-45.979,45.973c-8.188,0.905-16.259,3.48-23.907,7.633   c-10.811-5.315-22.175-8.004-33.883-8.004c-27.971,0-53.868,15.319-72.921,43.135C9.87,119.21,0.031,153.611,0.031,189.996   c0,36.385,9.839,70.786,27.704,96.866C46.788,314.677,72.686,329.996,100.656,329.996z M182.041,152.135l20-34.641   c2.68-4.641,7.631-7.5,12.99-7.5c5.359,0,10.311,2.859,12.99,7.5l19.626,33.993c1.521,2.346,2.403,5.144,2.403,8.147   c0,8.284-6.715,15-15,15c-0.005-0.001-0.013-0.001-0.02,0h-40c-5.359,0-10.311-2.859-12.99-7.5S179.361,156.776,182.041,152.135z    M82.041,152.135l20-34.641c2.68-4.641,7.631-7.5,12.99-7.5c5.359,0,10.311,2.859,12.99,7.5l19.626,33.993   c1.521,2.346,2.403,5.144,2.403,8.147c0,8.284-6.715,15-15,15c-0.005-0.001-0.014-0.001-0.02,0h-40c-5.359,0-10.31-2.859-12.99-7.5   S79.361,156.776,82.041,152.135z M81.02,201.503c5.094-4.994,13-5.71,18.908-1.71c19.248,13.028,41.76,19.915,65.104,19.915   c23.344,0,45.855-6.887,65.104-19.915c5.908-3.999,13.814-3.283,18.908,1.71c5.094,4.993,5.968,12.883,2.088,18.87   c-19.007,29.332-51.193,46.843-86.1,46.843c-34.906,0-67.093-17.511-86.1-46.843C75.052,214.386,75.926,206.496,81.02,201.503z"
                fill="#d1d5db"
              />
            </svg>
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
              v-for="item in hacktoberfestData"
              :key="item.id?.toString()"
              :item="item"
            />
          </div>
          <div v-else class="w-full h-screen flex items-center justify-center">
            <SVGCircle class="animate-ping" />
          </div>
        </transition>
      </div>
    </section>
  </main>
</template>

<style lang="postcss" scoped>
ul,
li {
  @apply my-2;
}
.soft-green {
  @apply px-4 py-2 mb-2 mr-2 rounded-xl border-4 border-emerald-500  bg-transparent hover:bg-opacity-20 hover:bg-emerald-500 text-white ring ring-transparent ring transition;
}
.heavy-green {
  @apply sm:ml-6 bg-gradient-to-tr from-emerald-600 to-emerald-400 px-6 py-3 rounded-lg ring ring-transparent ring hover:ring-emerald-500 transition;
}
</style>
