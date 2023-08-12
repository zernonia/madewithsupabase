<script setup lang="ts">
import { ref } from 'vue'
import type { Project } from '~/types'

const props = defineProps<{
  data?: Project | null
  handler: (ev: Project | null) => Promise<any>
  isHackathon?: boolean
}>()

const localData = ref<Project>()
const { supabaseFeatureOptions, tagOptions } = useTags()

whenever(() => [props.data], () => {
  if (props.data)
    localData.value = props.data
}, { immediate: true })

async function handleSubmit() {
  if (localData.value)
    await props.handler(localData.value)
}
</script>

<template>
  <div class="flex justify-center mt-8">
    <FormKit v-slot="{ value }" v-model="localData" type="form" :actions="false" @submit="handleSubmit">
      <FormKit
        type="uinput"
        label="Title"
        name="title"
        placeholder="My project"
        validation="required"
      />

      <FormKit
        type="uinput"
        label="URL"
        name="url"
        placeholder="https://madewithsupabase.com"
        validation="required|url"
      />

      <FormKit
        type="uinput"
        label="GitHub URL"
        name="github_url"
        help="url for your project"
        placeholder="https://github.com/zernonia/madewithsupabase"
        validation="url"
      />

      <FormKit
        type="utextarea"
        label="Description (Markdown)"
        name="description"
        placeholder="Write some description about your project"
        validation="required"
        :rows="5"
        autoresize
      />

      <FormKit
        type="uselect"
        label="Supabase Features"
        :options="supabaseFeatureOptions"
        name="supabase_features"
        multiple
        placeholder="Supabase Auth, Supabase Database ..."
        help="Choose applicable"
        validation="required"
      />

      <FormKit
        type="uselect"
        label="Tags"
        searchable
        :options="tagOptions"
        name="categories"
        multiple
        placeholder="Vuejs, Nuxtjs, ..."
        help="Choose applicable"
        validation="required"
      />

      <div v-if="!isHackathon" class="grid grid-cols-2 gap-4">
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

      <FormKit v-slot="{ items, node, value }" label="Team info" type="list" :value="[{}]" dynamic name="team_info">
        <label class="formkit-label text-sm mr-4" for="input_6">Team info</label>
        <div
          v-for="(item, index) in items"
          :key="item" class="flex items-center w-full"
        >
          <div class="flex-grow">
            <FormKit
              :index="index"
              type="teammember"
            />
          </div>
          <UButton icon="i-lucide-trash" color="gray" variant="solid" class="mb-1 ml-2" @click.prevent="() => node.input(value.filter((_, i) => i !== index))" />
        </div>

        <UButton color="gray" class="mb-4" label=" + Add team member" variant="solid" @click="() => node.input(value.concat({}))" />
      </FormKit>

      <FormKit
        type="ufileupload"
        label="Images"
        name="image_keys"
        :allow-multiple="true"
        :allow-reorder="true"
        :max-files="5"
        bucket-id="products"
      />

      <ul v-if="isHackathon" class="py-6 list-disc ml-4 text-xs text-gray-400">
        <li>
          Any intellectual property developed during the hackathon will belong to the team that developed it. We expect that each team will have an agreement between themselves regarding the IP, but this is not required.
        </li>
        <li>
          By making a submission you grant Supabase permission to use screenshots, code snippets, and/or links to your project or content of your README on our Twitter, blog, website, email updates, and in the Supabase discord server. Supabase does not make any claims over your IP.
        </li>
      </ul>

      <div class="flex justify-end mt-8">
        <FormKit type="ubutton" label="Submit" />
      </div>

      <DevOnly>
        <pre wrap>{{ value }}</pre>
      </DevOnly>
    </FormKit>
  </div>
</template>
