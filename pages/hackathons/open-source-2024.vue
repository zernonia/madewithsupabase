<script setup lang="ts">
import dayjs from 'dayjs/esm'
import type { Project } from '@/types'
import { slugify } from '~/functions'

const client = useSupabase()
const user = useSupabaseUser()
const toast = useToast()

const timeOriginal = ref(false)

const START_TIME = '2024-04-12T09:00:00.0-08:00'
const END_TIME = '2024-04-21T23:59:59.999-08:00'
const { timePT, timeLocale, isExpired, isStarted } = useTime(START_TIME, END_TIME)

const { data, refresh } = useAsyncData('open-source-hackathon', async () => {
  const { data } = await client.from('open-source-hackathon').select('user_id, users(*)', { count: 'exact' })
  return data
}, { server: false })

const isUserJoined = computed(() => !!data.value?.find(i => i.user_id === user.value?.id))
const allUsers = computed(() => data.value?.map(i => ({
  name: i.users?.username ?? i.users?.full_name ?? '',
  avatar: i.users?.avatar_url,
})))

const isJoining = ref(false)
async function joinHackathon() {
  if (!user.value?.id)
    return
  isJoining.value = true
  const { error } = await client.from('open-source-hackathon').insert({
    user_id: user.value?.id,
    allowed_email: true,
  })
  if (!error)
    await refresh()

  isJoining.value = false
}

const isSubmitted = useLocalStorage('open-source-submission', false)
async function handleSubmit(ev: Project | null) {
  if (ev?.title && user.value?.email) {
    const slug = slugify(ev.title)
    const { data, error } = await client.from('products').insert({ ...ev, slug, email: user.value.email }).select('slug')
    if (!error) {
      toast.add({ title: 'Submitted successfully!' })
      isSubmitted.value = true
    }
  }
}

const { data: projectSubmitted } = useAsyncData(
  'open-source-submission-count',
  async () => {
    const { data, error } = await client
      .rpc('submission_count', {
        tag: 'Open Source Hackathon',
      })
      .maybeSingle()
    return data ?? 0
  },
  { server: false },
)

definePageMeta({
  title: 'Open Source Hackathon',
  layout: 'blank',
})
</script>

<template>
  <div class="flex flex-col -mt-8">
    <!-- <img class="pointer-events-none fixed left-0 top-0 h-screen w-screen md:w-full object-cover" src="~~/assets/open-source-hackathon.webp"> -->

    <SideMenu class="bg-opacity-50 backdrop-blur-lg" />
    <!-- <div v-if="!isStarted" class="fixed top-1/2 left-1/2 -translate-x-1/2">
      <UButton target="_blank" to="https://supabase.com/blog/supabase-oss-hackathon" color="black" variant="solid" label="Stay tuned" />
    </div> -->

    <div class="z-10 ml-0 md:ml-[4.5rem]">
      <div class="flex flex-col justify-center items-center min-h-screen text-center py-16 sm:py-32">
        <div class="w-full relative  max-w-screen-sm p-8 md:p-12 rounded-2xl flex flex-col  items-center border border-gray-900 hover:border-gray-800 backdrop-blur-xl from-gray-900/60 to-gray-950/40 bg-gradient-to-br">
          <h1 class="font-semibold text-2xl  md:text-4xl">
            Open Source Hackathon
          </h1>

          <div v-if="!isExpired" class="flex flex-col items-center">
            <ClientOnly>
              <Countdown class="my-6" :date="dayjs(END_TIME).toDate()" />
              <div class="pb-6 md:text-lg">
                <h2>{{ timeOriginal ? timePT : timeLocale }}</h2>
              </div>
            </ClientOnly>
          </div>

          <div v-if="!isExpired" class="flex gap-x-2 relative">
            <UButton v-if="!user?.id" color="gray" class="!bg-gray-800 !text-white" label="Login to join!" to="/login?redirectTo=/hackathons/open-source" />
            <UTooltip v-else-if="!isUserJoined" text="Join">
              <UButton :loading="isJoining" color="gray" class="!bg-gray-800 !text-white" label="Join Hackathon!" @click="joinHackathon" />
            </UTooltip>
            <UButton target="_blank" to="https://supabase.com/blog/supabase-oss-hackathon" color="black" variant="solid" label="Read more" />
          </div>

          <span v-if="!isUserJoined" class="text-xs mt-4 text-white/50">Join the hackathon to receive email reminder!</span>

          <div v-if="projectSubmitted" class="text-xl md:text-3xl font-bold mt-6">
            {{ projectSubmitted }} submissions
          </div>

          <div class="h-[1px] w-32 bg-gray-400 my-8" />

          <div class="relative">
            <h2 class="text-2xl md:text-3xl text-gray-500 mb-4">
              {{ !isExpired ? "Who's joining the Hackathon?" : 'Thanks for participating!' }}
            </h2>
            <template v-for="u in allUsers" :key="u.name">
              <UTooltip
                :text="u.name"
                :popper="{
                  placement: 'top',
                }"
              >
                <UAvatar :src="u.avatar ?? ''" :alt="u.name" />
              </UTooltip>
            </template>
          </div>
        </div>

        <div v-if="isUserJoined && !isSubmitted && !isExpired" class="bg-gray-800/80 backdrop-blur-xl mt-12 relative w-full max-w-screen-sm text-left border border-gray-600 rounded-2xl p-8">
          <h2 class="text-center text-2xl md:text-4xl text-gray-300 my-2 font-medium">
            Submission
          </h2>
          <FormNew :handler="handleSubmit" is-hackathon :data="{ categories: ['Open Source Hackathon'] }" />
        </div>

        <div v-if="isSubmitted" class="border-gray-900 hover:border-gray-800 backdrop-blur-xl from-gray-900/60 to-gray-950/40 bg-gradient-to-br border mt-4 sm:mt-12 relative w-full max-w-screen-sm text-left rounded-2xl p-8">
          <h2 class="text-center text-2xl md:text-4xl text-gray-300 my-2 font-medium">
            All set! 🚀
          </h2>
          <p class="text-center mt-4">
            Stay tuned for the Medal Ceremony <br>
            You can edit your submission on the dashboard.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
