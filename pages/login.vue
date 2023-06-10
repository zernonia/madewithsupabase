<script setup lang="ts">
const client = useSupabase()

const isLoadingOAuth = ref(false)
async function handleSelectProvider() {
  isLoadingOAuth.value = true
  const { data, error } = await client.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${location.origin}/account`,
    },
  })
}

const isLoadingOtp = ref(false)
const email = ref('')
async function handleSubmit() {
  isLoadingOtp.value = true
  const { data, error } = await client.auth.signInWithOtp({
    email: email.value,
    options: {
      emailRedirectTo: `${location.origin}/account`,
    },
  })
  isLoadingOtp.value = false
}
</script>

<template>
  <LegoAuth
    class="max-w-[24rem] mx-auto mt-8 text-gray-200 w-full bg-gray-700 bg-opacity-20 hover:bg-opacity-50 border border-gray-700 transition duration-500 rounded-2xl px-8 py-10 shadow-sm"
    :hide-provider-label="true"
    :providers="['github']"
  >
    <LegoAuthHeader>
      <h2 class="mt-4 font-semibold text-xl">
        Create your account
      </h2>
      <p class="text-gray-400 text-sm mt-1">
        to continue to Made with Supabase
      </p>
    </LegoAuthHeader>

    <div class="flex space-x-2 w-full mt-6">
      <UButton :loading="isLoadingOAuth" block label="Login with GitHub" color="black" variant="solid" icon="i-lucide-github" @click="handleSelectProvider" />
    </div>

    <div class="mt-6 text-gray-600  flex justify-center items-center w-full">
      <hr class="flex-1 border-gray-600">
      <span class="mx-4">or</span>
      <hr class="flex-1 border-gray-600">
    </div>

    <LegoAuthForm class="mt-6 text-sm">
      <UInput
        v-model="email"
        name="email"
        type="email" placeholder="Email address" color="gray" variant="outline"
      />

      <UButton :loading="isLoadingOtp" :disabled="!email.length" block class=" mt-2" label="Login with Magic Link" @click="handleSubmit" />
    </LegoAuthForm>
  </LegoAuth>
</template>
