<script setup lang="ts">
import { ref } from 'vue'

const client = useSupabase()

const dataList = ref<any[]>([])
async function fetch() {
  const { data } = await client.from('products').select('*').match({
    approved: false,
  })
  if (data)
    dataList.value = data
}
fetch()
</script>

<template>
  <div>
    <div v-for="item in dataList" class="flex my-6 space-x-4">
      <img class="h-48 w-auto" :src="item.images[0]" alt="">
      <div class="flex flex-col space-y-2">
        <h1 class="font-bold">
          {{ item.title }}
        </h1>
        <p>{{ item.description }}</p>
        <ul class="text-light-900">
          <li v-for="feature in item.supabase_features">
            - {{ feature }}
          </li>
        </ul>
        <div>
          <router-link
            v-for="category in item.categories"
            class="mr-2 transition hover:text-warm-gray-200"
            :to="`/tag/${category}`"
          >
            #{{ category }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
