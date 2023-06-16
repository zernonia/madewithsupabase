<script setup lang="ts">
const { name, path } = toRefs(useRoute())

const router = useRouter()

const user = useSupabaseUser()
const userAvatar = computed(() => user.value?.user_metadata?.avatar_url)

const isSideMenuOpen = ref(false)
watch(name, () => {
  isSideMenuOpen.value = false
})

const isBackButtonShowing = computedWithControl(path, () => {
  if (process.server)
    return false
  return window.history.length >= 2 && path.value !== '/'
})

const links = computed(() => [{
  label: 'Home',
  icon: 'i-lucide-home',
  to: '/',
}, {
  label: 'Tags',
  icon: 'i-lucide-tag',
  to: '/tag',
}, {
  label: 'Hackathons',
  icon: 'i-lucide-sparkles',
  to: '/hackathons',
}, {
  label: 'Submission',
  icon: 'i-lucide-navigation',
  to: '/submission',
}])

const accounts = computed(() => [{
  label: 'Account',
  avatar: userAvatar.value
    ? { src: userAvatar.value }
    : undefined,
  icon: userAvatar.value ? '' : 'i-lucide-user',
  to: '/account',
}])
</script>

<template>
  <div class="w-[80px] hidden md:block" />
  <div class="hidden md:flex p-3 md:p-4 z-10 bg-gray-800 border-t md:border-t-0 md:border-r border-gray-700 fixed bottom-0 md:bottom-auto left-0 w-screen md:w-max md:h-screen md:flex-col justify-around md:justify-center md:space-y-2 text-2xl">
    <UTooltip
      v-for="link in links"
      :key="link.label"
      :text="link.label" :popper="{
        placement: 'right',
      }"
      class="justify-center items-center"
    >
      <NuxtLink :to="link.to" class="p-2 w-10 h-10 text-gray-500 hover:text-white transition">
        <UIcon :name="link.icon" />
      </NuxtLink>
    </UTooltip>

    <hr class="border-gray-700">

    <UTooltip
      text="Account" :popper="{
        placement: 'right',
      }"
      class="justify-center items-center"
    >
      <NuxtLink to="/account" class="p-2 w-10 h-10 text-gray-500 hover:text-white transition">
        <UAvatar v-if="userAvatar" class="-ml-1 -mt-1" :src="userAvatar" alt="Avatar" />
        <UIcon v-else name="i-lucide-user" />
      </NuxtLink>
    </UTooltip>

    <UTooltip
      text="Back" :popper="{
        placement: 'right',
      }"
      :class="{ 'opacity-100': isBackButtonShowing }"
      class="justify-center items-center opacity-0 transition-opacity"
    >
      <NuxtLink class="p-2 w-10 h-10 text-gray-500 hover:text-white transition cursor-pointer" @click="isBackButtonShowing && router.back()">
        <UIcon name="i-lucide-arrow-left" />
      </NuxtLink>
    </UTooltip>
  </div>

  <div class="block md:hidden">
    <UButton
      size="xl"
      color="gray"
      class="fixed bottom-4 right-4 z-10" :ui="{
        rounded: 'rounded-full',
      }" icon="i-lucide-menu" @click="isSideMenuOpen = true"
    />

    <USlideover v-model="isSideMenuOpen">
      <div class="p-4 flex flex-col justify-end h-full mb-20">
        <h2 class="my-2 font-medium ml-5 text-gray-600">
          Navigation
        </h2>
        <UVerticalNavigation :links="links" />

        <hr class="my-2 border-gray-700">

        <UVerticalNavigation :links="accounts" />
      </div>
      <UButton
        size="xl"
        color="gray"
        class="absolute bottom-4 right-4 z-10" :ui="{
          rounded: 'rounded-full',
        }" icon="i-lucide-x" @click="isSideMenuOpen = false"
      />
    </USlideover>
  </div>
</template>
