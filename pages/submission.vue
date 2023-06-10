<script setup lang="ts">
import { ref } from 'vue'

const client = useSupabase()
const isSubmitted = ref(false)

definePageMeta({
  title: 'Your New Project',
})

const a = ref({
  images: ['products/Group 70 (4).png'],
})

const options = ['United States', 'Canada', 'Mexico']

const supabaseFeatureOptions = [
  'Supabase Auth',
  'Supabase Database',
  'Supabase Function',
  'Supabase Storage',
  'Supabase Realtime',
]

const { data: tagOptions } = await useAsyncData('tagOptions', async () => {
  const { data } = await client
    .from('tags_view')
    .select('*')
    .order('tags', {
      ascending: true,
    })

  return data?.map(i => i.tags ?? '') ?? []
}, { server: false, default: () => [] as string[] })

const axios = {
  post: () => new Promise(r => setTimeout(r, 2000)),
}

async function login() {
  console.log('triggering ')
  const res = await axios.post()
  // do some login things now
  // alert('Logged in!')
}
</script>

<template>
  <div class="flex justify-center mt-8">
    <FormKit v-slot="{ value }" v-model="a" type="form" :actions="false" @submit="login">
      <FormKit
        type="uinput"
        label="Title"
        name="title"
        placeholder="My project"
        validation="required"
      />

      <FormKit
        type="uinput"
        label="Email"
        name="email"
        icon="i-heroicons-envelope"
        placeholder="madewithsupabase@gmail.com"
      />

      <FormKit
        type="uinput"
        label="URL"
        name="url"
        placeholder="https://madewithsupabase.com"
        validation="required"
      />

      <FormKit
        type="uinput"
        label="GitHub URL"
        name="github_url"
        help="url for your project"
        placeholder="https://github.com/zernonia/madewithsupabase"
        validation="required"
      />

      <FormKit
        type="utextarea"
        label="Description (Markdown)"
        name="description"
        placeholder="Write some description about your project"
        validation="required"
      />

      <FormKit
        type="uselect"
        label="Supabase Features"
        :options="supabaseFeatureOptions"
        name="features"
        multiple
        placeholder="Supabase Auth, Supabase Database ..."
        help="Choose applicable"
        validation="required"
      />

      <FormKit
        type="uselect"
        label="Tags"
        :options="tagOptions"
        name="tags"
        multiple
        placeholder="Vuejs, Nuxtjs, ..."
        help="Choose applicable"
        validation="required"
      />

      <div class="grid grid-cols-2 gap-4">
        <FormKit
          type="uinput"
          label="Twitter"
          name="twitter"
          icon="i-lucide-at-sign"
          placeholder="madewifsupabase"
        />

        <FormKit
          type="uinput"
          label="Instagram"
          name="instagram"
          icon="i-lucide-at-sign"
          placeholder="madewifsupabase"
        />
      </div>

      <FormKit
        type="ufileupload"
        label="Images"
        name="images"
        :allow-multiple="true"
        :allow-reorder="true"
        :max-files="5"
        bucket-id="products"
      />

      <FormKit type="ubutton" label="Submit" />
      <pre wrap>{{ value }}</pre>
    </FormKit>
    <!-- <Form v-if="!isSubmitted" @submit="isSubmitted = true" />
    <div v-else class="text-center mt-12">
      <h1 class="text-5xl">
        Thank you for submitting!
      </h1>
      <p class="text-white">
        I'm trying my best to get this done ASAP!
      </p>
    </div> -->
  </div>
</template>
