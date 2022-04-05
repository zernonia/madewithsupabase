<template>
  <div>
    <CustomMeta :title="'Bring the Func(🕺) | Made with Supabase'" />
    <transition name="fade">
      <main class="py-8">
        <section class="md:py-6 px-4 flex flex-col items-center">
          <a
            href="/"
            class="fixed left-0 top-5 px-4 md:px-6 py-4 rounded-r-full bg-dark-300"
          >
            <i-mdi:chevron-left></i-mdi:chevron-left>
          </a>

          <!-- Fx -->
          <a
            href="https://supabase.com/blog/2022/04/01/hackathon-bring-the-func"
            target="_blank"
          >
            <img class="w-full md:w-128" :src="HeroImage" alt="" />
          </a>

          <div
            v-if="!submitted"
            class="mt-8 text-center text-dark-50 font-normal text-xl sm:text-2xl flex flex-col sm:flex-row items-center"
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
                <i-ic:twotone-change-circle></i-ic:twotone-change-circle>
              </button>
            </span>
          </div>
          <div
            class="mt-12 flex flex-col items-center text-center"
            v-if="isExpired"
          >
            <h1 class="text-2xl sm:text-4xl">Time is up! ⌚</h1>
            <h1 class="text-xl sm:text-3xl">Thank you for Partipating!</h1>
            <p class="mt-2 text-light-900">Stay tuned for the Medal Ceremony</p>
          </div>
          <div class="mt-8 flex flex-col items-center" v-else-if="!submitted">
            <h2 class="text-2xl sm:text-4xl mt-1">
              <span ref="projectSubmittedRef">{{ projectSubmitted }}</span>
              Trees Planted 🌲
            </h2>
            <button class="btn mt-6" @click="goTo">Submit Project</button>
          </div>
          <div class="mt-12 flex flex-col items-center text-center" v-else>
            <h1 class="text-xl sm:text-3xl">Thank you for Partipating!</h1>
            <p class="mt-2 text-light-900">
              Stay tuned for the Medal Ceremony <br />
              You can edit your submission here before too late!
            </p>
            <div class="flex items-center mt-4">
              <input
                class="!rounded-r-none"
                type="text"
                disabled
                v-model="editingLink"
              />
              <button @click="copy()" class="btn !rounded-l-none !p-2.5">
                <i-mdi:content-copy></i-mdi:content-copy>
              </button>
            </div>
          </div>
        </section>

        <section
          v-if="!submitted && !isExpired"
          ref="submitTarget"
          class="flex flex-col items-center"
        >
          <div
            class="flex flex-col flex-col-reverse md:flex-row items-center max-w-screen-md mx-auto"
          >
            <div class="mt-6 md:py-16 px-4 sm:px-8 rounded-2xl flex flex-col">
              <h1
                class="text-4xl sm:text-5xl text-emerald-300 text-center md:text-left"
              >
                Checklist
              </h1>

              <p class="mt-8 text-xl">
                README in GitHub (or similar) should include:
              </p>
              <ul class="text-lg list-disc ml-4 text-light-900">
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
                <li>*optional* team photo</li>
              </ul>
            </div>
            <div class="h-64 md:h-full w-64 md:w-128" ref="checklist"></div>
          </div>

          <div
            id="checklist"
            class="mt-18 md:mt-0 flex flex-col md:flex-row items-center max-w-screen-md mx-auto"
          >
            <div class="h-56 md:h-full w-56 md:w-160" ref="rules"></div>

            <div class="mt-6 md:py-16 px-4 sm:px-8 rounded-2xl flex flex-col">
              <h1
                class="text-4xl sm:text-5xl text-emerald-300 text-center md:text-left"
              >
                Rules
              </h1>
              <ul class="text-lg list-disc ml-4 text-light-900">
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
            @submit="completed"
            :label="formCustomLabel"
            title="Submission"
            :defaultCategories="['Bring the Func']"
            isHackathon
          ></Form>
        </section>
      </main>
    </transition>
  </div>
</template>

<script lang="ts">
export default {
  layout: "blank",
}
</script>

<script setup lang="ts">
import lottie from "lottie-web"
import { useElementVisibility, useClipboard } from "@vueuse/core"
import { animate } from "motion"
import dayjs from "dayjs/esm/index.js"
import utc from "dayjs/esm/plugin/utc"
import timezone from "dayjs/esm/plugin/timezone"
import isSameOrAfter from "dayjs/esm/plugin/isSameOrAfter"
import HeroImage from "@/assets/fx.svg"

const { $supabase } = useNuxtApp()
dayjs.extend(utc)
dayjs.extend(timezone)

definePageMeta({
  layout: "blank",
})

const step = ref(0)
watch(step, () => {
  goTo()
})

const submitTarget = ref()
const goTo = () => {
  let d = submitTarget.value as HTMLDivElement
  document.documentElement.scrollTo({
    top: d.offsetTop,
    behavior: "smooth",
  })
}

const startDate = dayjs("1 April 2022 09:00:00 PDT")
const endDate = dayjs("10 April 2022 23:59:00 PDT")
const timeOriginal = ref(true)
const timePT = computed(() => {
  return `${startDate.tz("America/Los_Angeles").format("D MMM")} at ${startDate
    .tz("America/Los_Angeles")
    .format("hh:mma")} - to - ${endDate
    .tz("America/Los_Angeles")
    .format("D MMM")} at ${endDate
    .tz("America/Los_Angeles")
    .format("hh:mma")} (PT)`
})
const timeLocale = computed(() => {
  return `${startDate.format("D MMM")} at ${startDate.format(
    "hh:mma"
  )} - to - ${endDate.format("D MMM")} at ${endDate.format(
    "hh:mma"
  )} (${dayjs.tz.guess()})`
})

const isExpired = computed(() => {
  if (dayjs) {
    dayjs.extend(isSameOrAfter)
    return dayjs(Date.now()).isSameOrAfter(endDate)
  } else {
    return false
  }
})

// Checklist -- step 0
const checklist = ref()
const checklistIsVisible = useElementVisibility(checklist)

watch(checklistIsVisible, () => {
  if (!checklist.value?.children.length) {
    lottie.loadAnimation({
      container: checklist.value,
      renderer: "svg",
      loop: false,
      autoplay: true,
      path: "./checklist.json",
    })
  }
})

const rules = ref()
const rulesIsVisible = useElementVisibility(rules)

watch(rulesIsVisible, () => {
  if (!rules.value?.children.length) {
    lottie.loadAnimation({
      container: rules.value,
      renderer: "svg",
      loop: false,
      autoplay: true,
      path: "./rules.json",
    })
  }
})

const submitted = ref(false)
const editingLink = ref("https://www.madewithsupabase.com/edit/supabase-schema")
const completed = (slug: string) => {
  submitted.value = true
  editingLink.value = "https://www.madewithsupabase.com/edit/" + slug
}
const { text, copy, copied } = useClipboard({ source: editingLink })

const projectSubmittedRef = ref<HTMLElement>()
const projectSubmitted = ref(0)
const fetchProjectSubmitted = async () => {
  const { data, error } = await $supabase.rpc("submission_count", {
    tag: "Bring the Func",
  })

  if (data && projectSubmittedRef.value) {
    projectSubmitted.value = data as number
    animate(
      (progress) =>
        (projectSubmittedRef.value.innerHTML = String(Math.round(progress))),
      { duration: 1.5, easing: "ease-in-out" }
    )
  }
}
fetchProjectSubmitted()

const formCustomLabel = {
  url: "Demo URL",
  github_url: "(Public) Github URL",
  email: "Team Captain's Email",
  twitter: "Team Captain's Twitter handle",
}
</script>
