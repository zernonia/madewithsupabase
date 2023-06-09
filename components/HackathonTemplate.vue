<script setup lang="ts">
import { useClipboard, useLocalStorage } from '@vueuse/core'
import { animate } from 'motion'

const client = useSupabase()
const { timePT, timeLocale, isExpired } = useTime(
  '9 December 2022 08:00:00 PST',
  '19 December 2022 00:01:00 PST',
)
const localStorageSubmission = useLocalStorage('launch-week-6-hackathon', '')

const submitTarget = ref()
function goTo() {
  const d = submitTarget.value as HTMLDivElement
  document.documentElement.scrollTo({
    top: d.offsetTop,
    behavior: 'smooth',
  })
}

const timeOriginal = ref(true)
function completed(slug: string) {
  localStorageSubmission.value = `https://www.madewithsupabase.com/edit/${slug}`
}
const submitted = computed(() => localStorageSubmission.value)
const { copy } = useClipboard({ source: localStorageSubmission })

const projectSubmittedRef = ref<HTMLElement>()

const { data: projectSubmitted } = useAsyncData(
  'launch-week-6-submission-count',
  async () => {
    const { data, error } = await client
      .rpc('submission_count', {
        tag: 'Launch Week 6',
      })
      .maybeSingle()

    if (data && projectSubmittedRef.value) {
      animate(
        progress =>
          projectSubmittedRef.value
          && (projectSubmittedRef.value.innerHTML = String(
            Math.round(progress * data),
          )),
        { duration: 1, easing: 'ease-in-out' },
      )
    }
    return data
  },
  { server: false },
)

const formCustomLabel = {
  url: 'Demo URL',
  github_url: '(Public) Github URL',
  email: 'Team Captain\'s Email',
  twitter: 'Team Captain\'s Twitter handle',
}

definePageMeta({
  layout: 'blank',
})
</script>

<template>
  <div>
    <CustomMeta title="Launch Week 6 Hackathon" />
    <transition name="fade">
      <main class="py-8">
        <section class="md:py-6 px-4 flex flex-col items-center">
          <NuxtLink
            to="/"
            class="fixed left-0 top-7 px-4 md:px-6 py-3 rounded-r-full bg-gray-300"
          >
            <div class="i-mdi:chevron-left text-2xl" />
          </NuxtLink>

          <div>
            <NuxtLink
              to="https://supabase.com/blog/launch-week-6-hackathon"
              target="_blank"
              class="relative h-48 sm:h-80 lg:h-100 w-full flex flex-col justify-center items-center transition-all rounded-2xl md:rounded-3xl relative border border-gray-100 hover:border-gray-50 shadow-none hover:shadow-xl shadow-gray-300 overflow-hidden"
            >
              <img
                src="~~/assets/hackathon-lw6.jpg"
                alt="Supabase Launch Week 6 Hackathon"
                class="w-full h-full object-cover transition duration-750"
                style="object-position: center 68%"
              >
            </NuxtLink>
          </div>

          <div
            v-if="!submitted"
            class="mt-12 md:mt-18 text-center text-gray-50 font-normal text-xl sm:text-2xl flex flex-col sm:flex-row items-center"
          >
            <transition name="slide-fade" mode="out-in">
              <p v-if="timeOriginal">
                {{ timePT }}
              </p>
              <p v-else>
                {{ timeLocale }}
              </p>
            </transition>
            <span
              v-tooltip="'Toggle local time'"
              class="text-base flex items-center ml-2"
            >
              <button
                class="text-2xl !p-0 !bg-none transition transform duration-700 !ring-transparent hover:text-white"
                :class="[timeOriginal ? ' rotate-180' : ' rotate-0']"
                @click="timeOriginal = !timeOriginal"
              >
                <div class="i-ic:twotone-change-circle" />
              </button>
            </span>
          </div>
          <div
            v-if="isExpired"
            class="mt-12 flex flex-col items-center text-center"
          >
            <h2 class="text-2xl sm:text-4xl mt-1 mb-12">
              <span ref="projectSubmittedRef">{{ projectSubmitted }}</span>
              {{ projectSubmitted ?? 0 > 1 ? "submissions" : "submission" }}
            </h2>
            <h1 class="text-2xl sm:text-4xl">
              Time is up! ⌚
            </h1>
            <h1 class="text-xl sm:text-3xl">
              Thank you for Partipating!
            </h1>
            <p class="mt-2 text-white">
              Stay tuned for the Medal Ceremony
            </p>
          </div>
          <div v-else-if="!submitted" class="mt-4 flex flex-col items-center">
            <h2 class="text-2xl sm:text-4xl mt-1">
              <span ref="projectSubmittedRef">{{ projectSubmitted }}</span>
              {{ projectSubmitted ?? 0 > 1 ? "submissions" : "submission" }}
            </h2>
            <button class="btn mt-6" @click="goTo">
              Submit Project
            </button>
          </div>
          <div v-else class="mt-12 flex flex-col items-center text-center">
            <h1 class="text-xl sm:text-3xl">
              Thank you for Partipating!
            </h1>
            <p class="mt-2 text-white text-center">
              Stay tuned for the Medal Ceremony <br>
              You can edit your submission here before too late!
            </p>
            <div id="edit" class="flex items-center mt-4">
              <input
                v-model="localStorageSubmission"
                class="!rounded-r-none"
                type="text"
                disabled
              >
              <button class="btn !rounded-l-none !p-2.5" @click="copy()">
                <div class="i-mdi:content-copy" />
              </button>
            </div>
          </div>
        </section>

        <section
          v-if="!submitted && !isExpired"
          ref="submitTarget"
          style="max-width: 960px"
          class="mt-12 flex flex-col lg:flex-row h-full px-4 md:px-8 xl:px-0 mx-auto"
        >
          <div
            class="flex flex-col flex-col-reverse lg:w-1/2 bg-gradient-to-br from-gray-400 to-gray-800 border border-gray-300 rounded-2xl md:flex-row items-center"
          >
            <div class="p-4 sm:p-8 rounded-2xl flex flex-col">
              <h1
                class="text-2xl sm:text-3xl text-gray-50 text-center md:text-left"
              >
                Checklist
              </h1>

              <p class="mt-4 md:text-lg">
                README in GitHub (or similar) should include:
              </p>
              <ul
                class="mt-2 list-disc ml-4 text-sm md:text-base text-white"
              >
                <li>link to hosted demo (if applicable)</li>
                <li>
                  list of team members github handles (and twitter if they have
                  one) - any demo videos, instructions, or memes
                </li>
                <li>
                  a brief description of how you used Supabase:
                  <ul class="list-circle ml-4">
                    <li>to store data?</li>
                    <li>realtime?</li>
                    <li>auth?</li>
                    <li>storage?</li>
                  </ul>
                </li>
                <li>
                  any other info you want the judges to know
                  (motivations/ideas/process)
                </li>
              </ul>
            </div>
          </div>

          <div
            class="mt-12 lg:mt-0 lg:ml-8 flex flex-col lg:w-1/2 bg-gradient-to-br from-gray-400 to-gray-800 border border-gray-300 rounded-2xl md:flex-row items-center"
          >
            <div class="p-4 sm:p-8 rounded-2xl flex flex-col">
              <h1
                class="text-2xl sm:text-3xl text-gray-50 text-center md:text-left"
              >
                Rules
              </h1>
              <ul
                class="mt-4 list-disc ml-4 text-sm md:text-base text-white"
              >
                <li>
                  Team size 1-5 (all team members on winning teams will receive
                  a prize)
                </li>
                <li>You cannot be in multiple teams</li>
                <li>
                  All design elements, code, etc. for your project/feature must
                  be created during the event
                </li>
                <li>
                  All entries must be Open Source (link to source code required
                  in entry)
                </li>
                <li>Must use Supabase in some capacity</li>
                <li>Can be any language or framework</li>
                <li>
                  You can continue to make updates to your project after the
                  submission deadline, but there is no guarantee that the judges
                  will see additions made after the submission time.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section
          v-if="!submitted && !isExpired"
          class="w-full flex justify-center"
        >
          <Form
            :label="formCustomLabel"
            title="Submission"
            :default-categories="['Launch Week 6']"
            is-hackathon
            @submit="completed"
          />
        </section>
      </main>
    </transition>
  </div>
</template>

<style scoped lang="postcss">
:deep(.btn) {
  @apply bg-gray-400 rounded-full font-normal text-base border border-gray-300;
}
:deep(input),
:deep(textarea) {
  border-radius: 0.5rem;
  @apply border border-gray-300 focus:border-gray-50  focus:ring-gray-50;
}
:deep(form > div:nth-child(9) > div > div) {
  border-radius: 0.5rem;
  @apply focus:border focus:!border-gray-50 ring-0;
}
:deep(form > div:nth-child(9) > div > div > div:nth-child(1)) {
  border-radius: 0.5rem;
  @apply border focus:!border-gray-50 ring-0;
}
:deep(#form) {
  @apply font-normal text-2xl sm:text-3xl text-white;
}
:deep(#edit > input) {
  @apply rounded-full min-w-64;
}
:deep(#edit > button) {
  @apply !py-3;
}
</style>
