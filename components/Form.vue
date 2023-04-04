<script setup lang="ts">
import { PropType } from "vue"
import { slugify } from "~~/functions/slugify"

const props = defineProps({
  title: { type: String, default: "Project Submission" },
  label: Object,
  defaultCategories: Object as PropType<string[]>,
  isHackathon: { type: Boolean, default: false },
  defaultValue: Object,
})

const emit = defineEmits(["submit"])

const isSubmitting = ref(false)
const isSubmitted = ref(false)

const form = ref({
  title: "",
  email: "",
  url: "",
  github_url: "",
  description: "",
  categories: [] as string[],
  supabase_features: [],
  twitter: "",
  instagram: "",
  images: [] as string[],
  slug: "",
})
const terms = ref({
  acknowledge: false,
  accept: false,
})
const errorMsg = ref("")

const submit = async () => {
  const regexUrl =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
  if (props.isHackathon) {
    if (!terms.value.acknowledge || !terms.value.accept) return
  }
  if (
    form.value.title &&
    form.value.url.match(regexUrl) &&
    form.value.description &&
    (props.defaultValue ? true : form.value.email)
  ) {
    isSubmitting.value = true
    errorMsg.value = ""
    form.value.slug = slugify(form.value.title)

    const { data, error } = await $fetch(`/api/function/submission`, {
      method: "POST",
      body: { form: form.value },
    }).catch((err) => err.data)

    if (!error) {
      isSubmitted.value = true
      emit("submit", form.value.slug)
    } else {
      switch (error.code) {
        case "23505":
          errorMsg.value = "Title already exist. Please try another Title *"
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
  return form.value.images?.findIndex((i) => i.startsWith("data")) != -1
    ? true
    : false
})

const isPreviewMd = ref(false)

onMounted(() => {
  if (props.defaultCategories?.length) {
    form.value.categories = props.defaultCategories
  }
  if (props.defaultValue) {
    form.value = props.defaultValue
  }
})
</script>

<template>
  <form onsubmit="return false" class="mt-14 flex flex-col space-y-4 w-full">
    <div class="flex flex-col">
      <label for="title">{{ label?.title ?? "title" }} *</label>
      <input
        name="title"
        type="text"
        v-model="form.title"
        required
        placeholder="My Project"
      />
    </div>
    <div v-if="!defaultValue" class="flex flex-col">
      <label for="email" class="normal-case"
        >{{ label?.email ?? "Email (allow you to edit the project)" }} *</label
      >
      <input
        required
        name="email"
        type="email"
        v-model="form.email"
        placeholder="madewithsupabase@gmail.com"
      />
    </div>
    <div class="flex flex-col">
      <label for="url">{{ label?.url ?? "URL" }} *</label>
      <input
        name="url"
        type="url"
        v-model="form.url"
        required
        placeholder="https://www.supabase.io"
      />
    </div>
    <div class="flex flex-col">
      <label for="github_url">{{ label?.github_url ?? "github url" }}</label>
      <input
        name="github_url"
        type="text"
        v-model="form.github_url"
        placeholder="https://www.github.com/supabase/supabase"
      />
    </div>
    <div class="flex flex-col">
      <div class="flex justify-between items-center">
        <label for="description">description (Markdown Supported) * </label>
        <div class="flex space-x-2">
          <button
            @click.prevent="isPreviewMd = !isPreviewMd"
            class="hover:underline border-3 border-transparent px-2 rounded-lg focus:border-emerald-600 focus:outline-none"
          >
            {{ isPreviewMd ? "Edit" : "Preview" }}
          </button>
        </div>
      </div>
      <div class="w-full">
        <textarea
          v-if="!isPreviewMd"
          class="w-full"
          rows="6"
          name="description"
          v-model="form.description"
          required
          placeholder="Write some description about your project"
        />
        <Marked
          class="max-w-none px-4 py-2 border-3 border-transparent"
          v-else
          :text="form.description"
        ></Marked>
      </div>
    </div>
    <div class="flex flex-col">
      <label for="features">Supabase Features (choose applicable)</label>
      <TagsSelect v-model="form.supabase_features"></TagsSelect>
    </div>
    <div class="flex flex-col">
      <label for="categories">categories</label>
      <TagsInput v-model="form.categories"></TagsInput>
    </div>
    <div class="flex flex-col">
      <label class="normal-case" for="images">Image</label>
      <FormImage v-model="form.images" :title="form.title"></FormImage>
    </div>

    <div class="flex items-center justify-between">
      <div
        class="flex flex-col mr-4"
        :class="[isHackathon ? 'w-full' : 'w-1/2']"
      >
        <label for="twitter">{{ label?.twitter ?? "Twitter" }}</label>
        <div class="flex items-center">
          <span class="text-xl mr-2">@</span>
          <input
            class="w-full"
            name="twitter"
            type="text"
            v-model="form.twitter"
            placeholder="madewithsupabase"
          />
        </div>
      </div>
      <div v-if="!isHackathon" class="flex flex-col w-1/2">
        <label for="instagram">instagram</label>
        <div class="flex items-center">
          <span class="text-xl mr-2">@</span>
          <input
            class="w-full"
            name="instagram"
            type="text"
            v-model="form.instagram"
            placeholder="madewithsupabase"
          />
        </div>
      </div>
    </div>

    <div v-if="isHackathon" class="!my-8 px-6 py-4 bg-dark-600 rounded-lg">
      <p>
        Any intellectual property developed during the hackathon will belong to
        the team that developed it. We expect that each team will have an
        agreement between themselves regarding the IP, but this is not required
      </p>
      <div class="mt-2 flex items-center space-x-4">
        <input
          type="checkbox"
          name="acknowledge"
          id="acknowledge"
          required
          v-model="terms.acknowledge"
        />
        <label class="!text-base text-light-900" for="acknowledge"
          >Acknowledge</label
        >
      </div>

      <p class="mt-8">
        By making a submission you grant Supabase permission to use screenshots,
        code-snippets and/or links to your project or content of your README on
        our twitter, blog, website, email updates, and in the Supabase discord
        server. Supabase does not make any claims over your IP.
      </p>
      <div class="mt-2 flex items-center space-x-4">
        <input
          type="checkbox"
          name="accept"
          id="accept"
          required
          v-model="terms.accept"
        />
        <label class="!text-base text-light-900" for="accept">Accept</label>
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
        ></SVGCircle>
      </button>

      <span class="ml-4 text-red-500">{{ errorMsg }}</span>
    </div>
  </form>
</template>
