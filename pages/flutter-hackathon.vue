<script setup lang="ts">
import { useClipboard, useLocalStorage } from "@vueuse/core"
import { animate } from "motion"

const client = useSupabase()
const { timePT, timeLocale, isExpired } = useTime(
  "12 May 2023 06:00:00 PDT",
  "21 May 2023 23:59:59 PDT"
)
const localStorageSubmission = useLocalStorage("flutter-hackathon", "")

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
  useNuxtApp().$toast.success("Submission done!", { autoClose: 3000 })
}
const submitted = computed(() => localStorageSubmission.value)
const { copy } = useClipboard({ source: localStorageSubmission })

const projectSubmittedRef = ref<HTMLElement>()

const { data: projectSubmitted } = useAsyncData(
  "flutter-submission-count",
  async () => {
    const { data, error } = await client
      .rpc("submission_count", {
        tag: "Flutter Hackathon",
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

const copyLink = async () => {
  await copy()
  useNuxtApp().$toast.success("Copied", { autoClose: 3000 })
}

definePageMeta({
  title: "Flutter Hackathon",
})
</script>

<template>
  <div>
    <CustomMeta :title="'Flutter Hackathon'" />

    <main class="py-8">
      <section class="md:py-6 flex flex-col items-center">
        <div class="w-full md:w-auto">
          <NuxtLink
            to="https://supabase.com/launch-week"
            target="_blank"
            class="group relative h-48 sm:h-80 lg:h-100 w-full flex flex-col justify-center items-center transition-all duration-750 rounded-2xl md:rounded-3xl relative border-10 border-dark-500 border-opacity-10 overflow-hidden hover:scale-105"
          >
            <img
              src="~~/assets/flutter-hackathon.jpg"
              alt="Supabase Flutter Hackathon"
              class="w-full h-full object-cover transition duration-750 scale-100 group-hover:scale-110"
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
            <button @click="copyLink" class="btn !rounded-l-none !p-4 mt-2">
              <div class="i-mdi:content-copy"></div>
            </button>
          </div>
        </div>
      </section>

      <section
        v-if="!submitted && !isExpired"
        ref="submitTarget"
        class="max-w-[960px] mt-12 flex flex-col lg:flex-row h-full md:px-4 xl:px-0 mx-auto"
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
        <FormHackathon
          @submit="completed"
          :defaultCategories="['Flutter Hackathon']"
        ></FormHackathon>
      </section>
    </main>
  </div>
</template>
