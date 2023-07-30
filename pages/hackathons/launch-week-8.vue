<script setup lang="ts">
import { type Project } from '@/types'
import { slugify } from '~/functions'

const client = useSupabase()
const user = useSupabaseUser()
const toast = useToast()

const timeOriginal = ref(false)
const { timePT, timeLocale } = useTime('4 August 2023 08:00:00 PST',
  '15 August 2023 00:59:59 PST')

const { data, refresh } = useAsyncData('launch-week-hackathon-8', async () => {
  const { data } = await client.from('launch-week-hackathon-8').select('user_id, users(*)', { count: 'exact' })
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
  const { error } = await client.from('launch-week-hackathon-8').insert({
    user_id: user.value?.id,
    allowed_email: true,
  })
  if (!error)
    await refresh()

  isJoining.value = false
}

const isSubmitted = useLocalStorage('launch-week-8-submission', false)
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

definePageMeta({
  title: 'Launch Week 8 Hackathon',
  layout: 'blank',
})
</script>

<template>
  <div class="flex flex-col -mt-8  ">
    <img class="pointer-events-none fixed left-0 top-0 h-screen w-auto object-cover" src="~~/assets/launch-week-8.webp">

    <SideMenu class="bg-opacity-50 backdrop-blur-lg" />

    <div class="z-10 ml-0 md:ml-[4.5rem]">
      <div class="flex flex-col justify-center items-center min-h-screen text-center py-16 sm:py-32">
        <div class="w-full relative  max-w-screen-sm p-8 md:p-12 rounded-2xl flex flex-col  items-center border border-violet-900 hover:border-violet-800 backdrop-blur-xl from-gray-900/60 to-violet-950/40 bg-gradient-to-br">
          <h1 class="font-semibold text-2xl  md:text-4xl">
            Launch Week 8 Hackathon
          </h1>

          <div class="py-6 md:text-xl">
            <h2>{{ timeOriginal ? timePT : timeLocale }}</h2>
          </div>

          <div class="flex gap-x-2">
            <UButton v-if="!user?.id" color="violet" class="!bg-violet-800 !text-white" label="Login to join!" to="/login" />
            <UButton v-else-if="!isUserJoined" :loading="isJoining" color="violet" class="!bg-violet-800 !text-white" label="Join Hackathon!" @click="joinHackathon" />
            <UButton target="_blank" to="https://supabase.com/blog/supabase-lw8-hackathon" color="black" variant="solid" label="Read more" />
          </div>

          <div class="h-[1px] w-32 bg-gray-400 my-8" />

          <div class="">
            <template v-for="user in allUsers" :key="user.name">
              <UTooltip
                :text="user.name"
                :popper="{
                  placement: 'top',
                }"
              >
                <UAvatar :src="user.avatar ?? ''" :alt="user.name" />
              </UTooltip>
            </template>
          </div>
        </div>

        <div v-if="isUserJoined && !isSubmitted" class="bg-gray-800/80 backdrop-blur-xl mt-12 relative w-full max-w-screen-sm text-left border border-gray-600 rounded-2xl p-8">
          <h2 class="text-center text-2xl md:text-4xl text-gray-300 my-2 font-medium">
            Submission
          </h2>
          <FormNew :handler="handleSubmit" is-hackathon :data="{ categories: ['Launch Week 8'] }" />
        </div>

        <div v-if="isSubmitted" class="border-violet-900 hover:border-violet-800 backdrop-blur-xl from-gray-900/60 to-violet-950/40 bg-gradient-to-br border mt-4 sm:mt-12 relative w-full max-w-screen-sm text-left rounded-2xl p-8">
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
