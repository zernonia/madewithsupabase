<script setup lang="ts">
import { useClipboard, useLocalStorage } from "@vueuse/core"
import { animate } from "motion"

const client = useSupabase()
const { timePT, timeLocale, isExpired } = useTime(
  "7 April 2023 08:00:00 PST",
  "16 April 2023 00:00:00 PST"
)
const localStorageSubmission = useLocalStorage("launch-week-7-hackathon", "")

const submitTarget = ref()
const goTo = () => {
  let d = submitTarget.value as HTMLDivElement
  document.documentElement.scrollTo({
    top: d.offsetTop,
    behavior: "smooth",
  })
}

const timeOriginal = ref(true)
const completed = (slug: string) => {
  localStorageSubmission.value = "https://www.madewithsupabase.com/edit/" + slug
}
const submitted = computed(() => localStorageSubmission.value)
const { copy } = useClipboard({ source: localStorageSubmission })

const projectSubmittedRef = ref<HTMLElement>()

const { data: projectSubmitted } = useAsyncData(
  "launch-week-7-submission-count",
  async () => {
    const { data, error } = await client
      .rpc("submission_count", {
        tag: "Launch Week 7",
      })
      .maybeSingle()

    if (data && projectSubmittedRef.value) {
      animate(
        (progress) =>
          projectSubmittedRef.value &&
          (projectSubmittedRef.value.innerHTML = String(
            Math.round(progress * data)
          )),
        { duration: 1, easing: "ease-in-out" }
      )
    }
    return data
  },
  { server: false }
)

const formCustomLabel = {
  url: "Demo URL",
  github_url: "(Public) Github URL",
  email: "Team Captain's Email",
  twitter: "Team Captain's Twitter handle",
}

definePageMeta({
  title: "Launch Week 7",
  noise_bg_color:
    "60deg,rgba(0, 41, 255, 1),rgba(200, 200, 200, 0.85),rgba(158,68,239, 0.85)",
})
</script>

<template>
  <div>
    <CustomMeta :title="'Launch Week 7 Hackathon'" />

    <main class="py-8">
      <section class="md:py-6 px-4 flex flex-col items-center">
        <div>
          <NuxtLink
            to="https://supabase.com/launch-week"
            target="_blank"
            class="group relative h-48 sm:h-80 lg:h-100 w-full flex flex-col justify-center items-center transition-all duration-750 rounded-2xl md:rounded-3xl relative border-10 border-dark-500 border-opacity-10 overflow-hidden hover:scale-105"
          >
            <img
              src="~~/assets/launch-week-7-banner.jpeg"
              alt="Supabase Launch Week 7 Hackathon"
              class="w-full h-full object-cover transition duration-750 scale-110 group-hover:scale-120"
              style="object-position: center 68%"
            />
          </NuxtLink>
        </div>

        <div
          v-if="!submitted"
          class="mt-12 md:mt-18 text-center text-white font-normal text-xl sm:text-2xl flex flex-col sm:flex-row items-center"
        >
          <transition name="slide-fade" mode="out-in">
            <p v-if="timeOriginal">{{ timePT }}</p>
            <p v-else>{{ timeLocale }}</p>
          </transition>
          <span
            class="text-base flex items-center ml-2"
            v-tooltip="'Toggle local time'"
          >
            <button
              class="text-2xl !p-0 !bg-none transition transform duration-700 !ring-transparent hover:text-white"
              :class="[timeOriginal ? ' rotate-180' : ' rotate-0']"
              @click="timeOriginal = !timeOriginal"
            >
              <div class="i-ic:twotone-change-circle"></div>
            </button>
          </span>
        </div>
        <div
          class="mt-12 flex flex-col items-center text-center"
          v-if="isExpired"
        >
          <h2 class="text-2xl sm:text-4xl mt-1 mb-12">
            <span ref="projectSubmittedRef">{{ projectSubmitted }}</span>
            {{ projectSubmitted ?? 0 > 1 ? "submissions" : "submission" }}
          </h2>
          <h1 class="text-2xl sm:text-4xl">Time is up! ⌚</h1>
          <h1 class="text-xl sm:text-3xl">Thank you for Partipating!</h1>
          <p class="mt-2 text-light-900">Stay tuned for the Medal Ceremony</p>
        </div>
        <div class="mt-4 flex flex-col items-center" v-else-if="!submitted">
          <h2 class="text-2xl sm:text-4xl mt-1">
            <span ref="projectSubmittedRef">{{ projectSubmitted }}</span>
            {{ projectSubmitted ?? 0 > 1 ? "submissions" : "submission" }}
          </h2>
          <button class="btn mt-6" @click="goTo">Submit Project</button>
        </div>
        <div class="mt-12 flex flex-col items-center text-center" v-else>
          <h1 class="text-xl sm:text-3xl">Thank you for Partipating!</h1>
          <p class="mt-2 text-light-900 text-center">
            Stay tuned for the Medal Ceremony <br />
            You can edit your submission here before too late!
          </p>
          <div class="flex items-center mt-4" id="edit">
            <input
              class="!rounded-r-none"
              type="text"
              disabled
              v-model="localStorageSubmission"
            />
            <button @click="copy()" class="btn !rounded-l-none !p-2.5">
              <div class="i-mdi:content-copy"></div>
            </button>
          </div>
        </div>
      </section>

      <section
        v-if="!submitted && !isExpired"
        ref="submitTarget"
        class="max-w-[960px] mt-12 flex flex-col lg:flex-row h-full px-4 md:px-8 xl:px-0 mx-auto"
      >
        <div
          class="flex flex-col flex-col-reverse lg:w-1/2 bg-dark-500 bg-opacity-20 rounded-2xl md:flex-row items-center"
        >
          <div class="p-4 sm:p-8 rounded-2xl flex flex-col">
            <h1
              class="text-2xl sm:text-3xl text-white text-center md:text-left"
            >
              Checklist
            </h1>

            <p class="mt-4 md:text-lg">
              README in GitHub (or similar) should include:
            </p>
            <ul class="mt-2 list-disc ml-4 text-sm md:text-base text-light-900">
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
          class="mt-12 lg:mt-0 lg:ml-8 flex flex-col lg:w-1/2 bg-dark-500 bg-opacity-20 rounded-2xl md:flex-row items-center"
        >
          <div class="p-4 sm:p-8 rounded-2xl flex flex-col">
            <h1
              class="text-2xl sm:text-3xl text-white text-center md:text-left"
            >
              Rules
            </h1>
            <ul class="mt-4 list-disc ml-4 text-sm md:text-base text-light-900">
              <li>
                Team size 1-5 (all team members on winning teams will receive a
                prize)
              </li>
              <li>You cannot be in multiple teams</li>
              <li>
                All design elements, code, etc. for your project/feature must be
                created during the event
              </li>
              <li>
                All entries must be Open Source (link to source code required in
                entry)
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
        class="max-w-[960px] mx-auto w-full flex justify-center"
      >
        <Form
          @submit="completed"
          :label="formCustomLabel"
          title="Submission"
          :defaultCategories="['Launch Week 7']"
          isHackathon
        ></Form>
      </section>
    </main>
  </div>
</template>

<style scoped lang="postcss">
:deep(.btn),
:deep(.tag-btn) {
  @apply bg-purple-500 hover:bg-purple-600 border-none;
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
  @apply bg-purple-500;
}
:deep(input[type="checkbox"]) {
  @apply mt-0 bg-purple-600;
}
</style>
