<script setup lang="ts">
defineProps<{ id: string }>()
</script>

<template>
  <LegoTweet
    v-slot="{ url }"
    :tweet-id="id"
    class="max-w-[550px] h-max bg-dark-500 p-4 rounded-xl border border-dark-600"
  >
    <NuxtLink target="_blank" :to="url">
      <div class="flex justify-between">
        <LegoTweetUser v-slot="{ user }">
          <div class="flex items-center">
            <LegoTweetUserAvatar>
              <span />
            </LegoTweetUserAvatar>
            <div class="ml-3">
              <p class="font-semibold leading-5">
                {{ user.name }}
              </p>
              <p class="text-gray-400">
                @{{ user.screen_name }}
              </p>
            </div>
          </div>
        </LegoTweetUser>

        <LegoTweetLink :href="url">
          <Icon name="uil:twitter" class="text-3xl text-blue-300" />
        </LegoTweetLink>
      </div>
      <LegoTweetText
        class="mt-4 text-sm md:text-base"
        link-class="text-emerald-400 hover:underline"
      />

      <LegoTweetSummaryCard
        v-slot="{ title, description, domain }"
        class="mt-2 border rounded-xl overflow-hidden bg-white hover:bg-gray-100 transition"
      >
        <div class="px-4 py-2 h-full">
          <p class="text-sm text-gray-400">
            {{ domain }}
          </p>
          <p>{{ title }}</p>
          <p class="text-sm text-gray-400">
            {{ description }}
          </p>
        </div>
      </LegoTweetSummaryCard>
    </NuxtLink>
  </LegoTweet>
</template>
