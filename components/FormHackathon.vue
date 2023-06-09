<script setup lang="ts">
import type { PropType } from 'vue'
import type { NonNullableProjectForm } from '~/types'
import { slugify } from '~~/functions/slugify'

const props = defineProps({
  defaultCategories: Object as PropType<string[]>,
})

const emit = defineEmits(['submit'])

const isSubmitting = ref(false)
const isSubmitted = ref(false)

const form = ref<NonNullableProjectForm>({
  title: '',
  email: '',
  url: '',
  github_url: '',
  description: '',
  categories: [] as string[],
  supabase_features: [],
  twitter: '',
  instagram: '',
  images: [] as string[],
  slug: '',
  team_info: [],
})
const terms = ref({
  acknowledge: false,
  accept: false,
})
const errorMsg = ref('')

async function submit() {
  const regexUrl
    = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
  if (!terms.value.acknowledge || !terms.value.accept)
    return
  if (
    form.value.title
    && form.value.url.match(regexUrl)
    && form.value.description
    && form.value.email
  ) {
    isSubmitting.value = true
    errorMsg.value = ''
    form.value.slug = slugify(form.value.title)

    const { data, error } = await $fetch('/api/function/submission', {
      method: 'POST',
      body: { form: form.value },
    }).catch(err => err.data)

    if (!error) {
      isSubmitted.value = true
      emit('submit', form.value.slug)
    }
    else {
      switch (error.code) {
        case '23505':
          errorMsg.value = 'Title already exist. Please try another Title *'
          break
        default:
          errorMsg.value = error.meesage
          break
      }
    }
    isSubmitting.value = false
  }
}

const isStillUploadingImage = computed(() => {
  return form.value.images?.findIndex(i => i.startsWith('data')) !== -1
})

const isPreviewMd = ref(false)

onMounted(() => {
  if (props.defaultCategories?.length)
    form.value.categories = props.defaultCategories
})
</script>

<template>
  <form onsubmit="return false" class="mt-14 flex flex-col space-y-4 w-full">
    <div class="flex flex-col">
      <label for="title">title *</label>
      <input
        v-model="form.title"
        name="title"
        type="text"
        required
        placeholder="My Project"
      >
    </div>

    <div class="flex flex-col md:flex-row items-center gap-4">
      <div class="flex flex-col w-full">
        <label for="url">URL *</label>
        <input
          v-model="form.url"
          name="url"
          type="url"
          required
          placeholder="https://www.supabase.io"
        >
      </div>
      <div class="flex flex-col w-full">
        <label for="github_url">GitHub URL</label>
        <input
          v-model="form.github_url"
          name="github_url"
          type="text"
          placeholder="https://www.github.com/supabase/supabase"
        >
      </div>
    </div>
    <div class="flex flex-col">
      <div class="flex justify-between items-center">
        <label for="description">description (Markdown Supported) * </label>
        <div class="flex space-x-2">
          <button
            class="hover:underline border-[3px] border-transparent px-2 rounded-lg"
            @click.prevent="isPreviewMd = !isPreviewMd"
          >
            {{ isPreviewMd ? "Edit" : "Preview" }}
          </button>
        </div>
      </div>
      <div class="w-full">
        <textarea
          v-if="!isPreviewMd"
          v-model="form.description"
          class="w-full"
          rows="6"
          name="description"
          required
          placeholder="Write some description about your project"
        />
        <Marked
          v-else
          class="max-w-none px-4 py-2 border-[3px] border-transparent"
          :text="form.description"
        />
      </div>
    </div>

    <div class="flex flex-col">
      <label for="features">Supabase Features (choose applicable) *</label>
      <TagsSelect v-model="form.supabase_features" />
    </div>
    <div class="flex flex-col">
      <label for="categories">categories</label>
      <TagsInput v-model="form.categories" />
    </div>

    <div class="flex flex-col">
      <label class="mb-2" for="images">Image</label>
      <FormImage v-model="form.images" :title="form.title" />
    </div>

    <div class="flex flex-col md:flex-row items-center justify-between">
      <div class="flex flex-col md:mr-4 w-full md:w-1/2">
        <label for="twitter">Captain's Twitter *</label>
        <div class="flex items-center">
          <span class="text-xl mr-2">@</span>
          <input
            v-model="form.twitter"
            class="w-full"
            name="twitter"
            required
            type="text"
            placeholder="madewithsupabase"
          >
        </div>
      </div>
      <div class="flex flex-col w-full md:w-1/2">
        <label for="email">Captain's Email *</label>
        <input
          v-model="form.email"
          class="w-full"
          name="email"
          type="text"
          required
          placeholder="madewithsupabase@gmail.com"
        >
      </div>
    </div>

    <div class="flex flex-col">
      <label>Team member (if any)</label>
      <FormTeamMember v-model="form.team_info" />
    </div>

    <div class="!my-8 px-6 py-4 bg-gray-600 rounded-lg">
      <p>
        Any intellectual property developed during the hackathon will belong to
        the team that developed it. We expect that each team will have an
        agreement between themselves regarding the IP, but this is not required
      </p>
      <div class="mt-2 flex items-center space-x-4">
        <input
          id="acknowledge"
          v-model="terms.acknowledge"
          type="checkbox"
          name="acknowledge"
          required
        >
        <label class="!text-base text-white" for="acknowledge">Acknowledge</label>
      </div>

      <p class="mt-8">
        By making a submission you grant Supabase permission to use screenshots,
        code-snippets and/or links to your project or content of your README on
        our twitter, blog, website, email updates, and in the Supabase discord
        server. Supabase does not make any claims over your IP.
      </p>
      <div class="mt-2 flex items-center space-x-4">
        <input
          id="accept"
          v-model="terms.accept"
          type="checkbox"
          name="accept"
          required
        >
        <label class="!text-base text-white" for="accept">Accept</label>
      </div>
    </div>

    <div class="flex items-center">
      <button
        :disabled="isSubmitting || isStillUploadingImage"
        class="btn w-min flex items-center"
        @click="submit"
      >
        Submit
        <SVGCircle
          v-if="isSubmitting"
          class="w-4 h-4 ml-4 animate-ping"
        />
      </button>

      <span class="ml-4 text-red-500">{{ errorMsg }}</span>
    </div>
  </form>
</template>

<style scoped>
input, textarea, :deep(input), :deep(#form-image) {
  @apply border-2 border-gray-600 placeholder-gray-500;
}
</style>
