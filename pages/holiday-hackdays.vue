<template>
  <div>
    <transition name="fade">
      <main class="py-8" v-if="isMounted">
        <section class="md:py-6 px-4 flex flex-col items-center">
          <a href="/">
            <img class="w-12 sm:w-16" :src="SiteLogo" alt="" />
          </a>
          <div
            class="px-1 mt-12 h-36 md:h-52 w-full max-w-screen-lg rounded-lg"
          >
            <div class="relative flex h-full w-full">
              <a
                href="https://supabase.com"
                rel="noopener"
                target="_blank"
                class="
                  z-10
                  absolute
                  w-full
                  h-full
                  flex
                  justify-center
                  items-center
                  bg-gradient-to-br
                  from-gray-900
                  to-black
                  rounded-lg
                  overflow-hidden
                "
              >
                <img
                  class="w-full h-full object-cover"
                  :src="HeroImage"
                  alt=""
                />
              </a>
              <div
                class="absolute w-full h-full bg-conic-gradient filter blur-xl"
              ></div>
              <div
                class="
                  absolute
                  w-full
                  h-full
                  bg-conic-gradient
                  filter
                  blur-3xl
                  opacity-60
                  animate-pulse-slow
                "
              ></div>
              <div class="absolute -inset-1 rounded-lg bg-conic-gradient"></div>
            </div>
          </div>
          <div
            v-if="!submitted"
            class="
              mt-8
              text-center text-dark-50
              font-normal
              text-xl
              sm:text-2xl
              flex flex-col
              sm:flex-row
              items-center
            "
          >
            <transition name="slide-fade" mode="out-in">
              <p v-if="timeOriginal">
                3 Dec at 07:00am - to - 12 Dec at 11:59pm (PDT)
              </p>
              <p v-else>{{ timeString }}</p>
            </transition>
            <button
              class="
                !p-0
                !bg-none
                transition
                transform
                duration-700
                !ring-transparent
                hover:text-white
              "
              :class="[timeOriginal ? ' rotate-180' : ' rotate-0']"
              @click="timeOriginal = !timeOriginal"
            >
              <i-ic:twotone-change-circle></i-ic:twotone-change-circle>
            </button>
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
              {{ projectSubmitted }} Projects Submitted
            </h2>
            <button class="w-max mt-6" @click="goTo">Submit Project</button>
          </div>
          <div class="mt-12 flex flex-col items-center text-center" v-else>
            <h1 class="text-xl sm:text-3xl">Thank you for Partipating!</h1>
            <p class="mt-2 text-light-900">Stay tuned for the Medal Ceremony</p>
          </div>
        </section>

        <section
          v-if="!submitted"
          ref="submitTarget"
          class="flex flex-col items-center"
        >
          <div
            class="
              flex flex-col flex-col-reverse
              md:flex-row
              items-center
              max-w-screen-md
              mx-auto
            "
          >
            <div class="mt-6 md:py-16 px-4 sm:px-8 rounded-2xl flex flex-col">
              <h1
                class="
                  text-4xl
                  sm:text-5xl
                  text-emerald-300 text-center
                  md:text-left
                "
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
            class="
              mt-18
              md:mt-0
              flex flex-col
              md:flex-row
              items-center
              max-w-screen-md
              mx-auto
            "
          >
            <div class="h-56 md:h-full w-56 md:w-160" ref="rules"></div>

            <div class="mt-6 md:py-16 px-4 sm:px-8 rounded-2xl flex flex-col">
              <h1
                class="
                  text-4xl
                  sm:text-5xl
                  text-emerald-300 text-center
                  md:text-left
                "
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

        <section v-if="!submitted" class="w-full">
          <FormHacktoberfest @submit="completed"></FormHacktoberfest>
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
import { ref, computed, watch } from "vue"
import lottie from "lottie-web"
import { useElementVisibility, useClipboard } from "@vueuse/core"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"
import SiteLogo from "@/assets/logo.svg"
import HeroImage from "@/assets/supabase-hackathon-v2.png"

const { $supabase } = useNuxtApp()

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

const timeOriginal = ref(true)
const timeString = computed(() => {
  dayjs.extend(utc)
  dayjs.extend(timezone)
  // 1 Oct at 08:00am
  const start = dayjs("3 Dec 2021 07:00:00 PDT")
  const end = dayjs("12 Dec 2021 23:59:00 PDT")
  // const start = `${s.getDate()} Oct 2021 ${s.getHours()}:${(s.getMinutes() < 10 ? "0" : "") + s.getMinutes()}`
  return `${start.format("D MMM")} at ${start.format(
    "hh:mma"
  )} - to - ${end.format("D MMM")} at ${end.format(
    "hh:mma"
  )} (${dayjs.tz.guess()})`
})

const isExpired = computed(() => {
  if (dayjs) {
    dayjs.extend(isSameOrAfter)
    const end = dayjs("12 Dec 2021 23:59:00 PDT")
    return dayjs(Date.now()).isSameOrAfter(end)
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

const projectSubmitted = ref(0)
const fetchProjectSubmitted = async () => {
  const { data, error } = await $supabase.rpc("submission_count", {
    tag: "Holiday Hackdays",
  })

  if (data) projectSubmitted.value = data as number
}
fetchProjectSubmitted()

const isMounted = ref(false)
onMounted(() => {
  isMounted.value = true
})
</script>

<style lang="postcss" scoped>
ul,
li {
  @apply my-2;
}

button {
  @apply sm:ml-6 bg-gradient-to-tr from-emerald-600 to-emerald-400 px-6 py-3 rounded-lg ring ring-transparent ring hover:ring-emerald-500 transition;
}
</style>
