<script setup lang="ts">
import { ref } from 'vue'
import type { Project } from '~/types'

const props = defineProps<{
  data?: Project | null
  handler: (ev: Project | null) => Promise<any>
}>()

const localData = ref<Project>()
const { supabaseFeatureOptions, tagOptions } = useTags()

whenever(() => props.data?.id, () => {
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
        rows="5"
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
        name="image_keys"
        :allow-multiple="true"
        :allow-reorder="true"
        :max-files="5"
        bucket-id="products"
      />

      <div class="flex justify-end mt-8">
        <FormKit type="ubutton" label="Submit" />
      </div>

      <DevOnly>
        <pre wrap>{{ value }}</pre>
      </DevOnly>
    </FormKit>
  </div>
</template>
