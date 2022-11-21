<template>
  <div class="flex flex-col items-center">
    <button
      @click="$router.back()"
      class="w-full mt-4 inline-flex items-center text-dark-50 hover:text-light-900 transition"
    >
      <div class="i-mdi:menu-left mr-2 w-6 h-6"></div>
      Back
    </button>
    <h1 id="form" class="text-3xl text-center mt-8">
      Editing: {{ form.title }}
    </h1>
    <form
      v-if="!isApproved"
      class="flex flex-col space-y-4 p-4 md:p-8 rounded-md w-full max-w-screen-sm"
    >
      <p class="text-center text-dark-50">
        Verify that you are the author. Insert the email that you use when
        submitting the project.
      </p>
      <div class="flex flex-col">
        <label for="email">email</label>
        <input
          name="email"
          type="text"
          v-model="email"
          required
          placeholder="admin@madewithsupabase.com"
        />
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <button class="btn w-min flex items-center" @click="verify">
            Submit
            <SVGCircle
              v-if="isSubmitting"
              class="w-4 h-4 ml-4 animate-ping"
            ></SVGCircle>
          </button>
          <span>{{ response }}</span>
        </div>
        <button @click="help" class="btn-icon text-sm">Contact Admin</button>
      </div>
    </form>
    <form
      v-if="!isSubmitted && isApproved"
      onsubmit="return false"
      class="flex flex-col space-y-4 p-4 md:p-8 rounded-md w-full max-w-screen-lg"
    >
      <div class="flex flex-col">
        <label for="title">title *</label>
        <input
          name="title"
          type="text"
          v-model="form.title"
          required
          placeholder="My Project"
        />
      </div>
      <div class="flex flex-col">
        <label for="url">URL *</label>
        <input
          name="url"
          type="url"
          v-model="form.url"
          required
          placeholder="https://www.supabase.io"
        />
      </div>
      <div class="flex flex-col">
        <label for="github_url">github url</label>
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
              @click.prevent="isPreviewMd = true"
              class="hover:underline"
              v-if="!isPreviewMd"
            >
              Preview
            </button>
            <button
              @click.prevent="isPreviewMd = false"
              class="hover:underline"
              v-else
            >
              Edit
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
          <Marked class="max-w-none" v-else :text="form.description"></Marked>
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
        <div class="h-64 flex rounded-md">
          <div
            v-if="form.images.length"
            class="w-full h-full flex overflow-hidden overflow-x-auto"
          >
            <div
              @click="target?.click()"
              class="h-64 w-64 text-light-900 cursor-pointer flex flex-shrink-0 flex-col items-center justify-center border-dark-500 border-2 border-dashed"
            >
              <div class="i-mdi:plus w-12 h-12"></div>
              <p>Click to 'Add' images</p>
              <input
                class="hidden"
                ref="target"
                type="file"
                @input="pickFile"
                accept="image/*"
              />
            </div>
            <div
              v-for="(blob, index) in form.images"
              class="ml-2 flex-shrink-0 relative hover:children:block"
            >
              <div
                v-if="blob.startsWith('http')"
                class="absolute w-full h-full center hidden hover:bg-dark-900 hover:bg-opacity-25"
              >
                <button
                  @click.prevent="removeImage(index)"
                  class="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                >
                  <div class="i-mdi:trash-can w-12 h-12"></div>
                  Click to 'Remove' image
                </button>
              </div>
              <div
                v-else
                class="absolute w-full h-full center bg-dark-900 bg-opacity-25"
              >
                <button
                  @click.prevent=""
                  class="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                >
                  <SVGCircle class="animate-ping w-16"></SVGCircle>
                </button>
              </div>
              <img :src="blob" class="h-full w-auto rounded-md" />
            </div>
          </div>
          <div
            @click="target?.click()"
            v-else
            class="text-light-900 cursor-pointer w-full flex flex-col items-center justify-center border-dark-500 border-2 border-dashed"
          >
            <div class="i-mdi:plus w-12 h-12"></div>
            <p>Click to 'Add' images</p>
            <input
              class="hidden"
              ref="target"
              type="file"
              @input="pickFile"
              accept="image/*"
            />
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex flex-col w-1/2 mr-4">
          <label for="twitter">Twitter</label>
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
        <div class="flex flex-col w-1/2">
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
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
const client = useSupabase()

const isSubmitting = ref(false)
const isSubmitted = ref(false)
const isApproved = ref(false)

const email = ref("")
const response = ref("")
const form = ref({
  title: "",
  email: "",
  description: "",
  categories: [],
  supabase_features: [],
  url: "",
  github_url: "",
  twitter: "",
  instagram: "",
  images: [] as string[],
  slug: "",
})

const slugify = (str: string) => {
  str = str.replace(/^\s+|\s+$/g, "")
  str = str.toLowerCase()

  var from =
    "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;"
  var to =
    "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------"
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i))
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
  return str
}

const verify = async (e: any) => {
  if (!email.value) return
  e.preventDefault()
  isSubmitting.value = true
  response.value = ""

  const data = (await $fetch("/api/edit/verify", {
    method: "POST",
    body: {
      email: email.value,
      slug: route.params.name,
    },
  })) as any

  isSubmitting.value = false

  if (data.verify) {
    isApproved.value = true
  } else {
    response.value = "Incorrect email"
  }
}

const help = async (e: any) => {
  if (!email.value) return
  e.preventDefault()
  const formData = new FormData()
  formData.append("email", email.value)
  formData.append("slug", route.params.name as string)
  const data = await fetch("https://www.supaform.com/api/form/iSW8oO8SUHI", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.ok)
    .finally(() => (isSubmitting.value = false))

  response.value = "Will contact you shortly"
}

const submit = async () => {
  const regexUrl =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
  if (
    form.value.title &&
    form.value.url.match(regexUrl) &&
    form.value.description
  ) {
    isSubmitting.value = true
    form.value.slug = slugify(form.value.title)

    const { data } = (await $fetch(`/api/edit`, {
      method: "POST",
      body: { form: form.value },
    })) as any

    if (data) {
      isSubmitting.value = false
      isSubmitted.value = true
      router.push("/p/" + data.slug)
    }
  }
}

const target = ref<HTMLInputElement>()
const pickFile = (e: any) => {
  let files = target.value?.files as FileList

  if (files.length) {
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader()
      reader.onload = async (e) => {
        const result = e.target?.result as string
        let r = (Math.random() + 1).toString(36).substring(7)
        let index = form.value.images.length
        form.value.images[index] = result
        const title = slugify(form.value.title + "-" + r + "-" + files[i].name)
        const { data } = await client.storage
          .from("products")
          .upload(title, files[i])
        if (data) {
          const {
            data: { publicUrl },
          } = client.storage.from("products").getPublicUrl(title)
          if (publicUrl) {
            form.value.images[index] = publicUrl
          }
        }
      }
      reader.readAsDataURL(files[i])
    }
  }
}

const removeImage = async (index: number) => {
  let imageStr = form.value.images[index].split("products/")[1]
  form.value.images.splice(index, 1)
  const { data, error } = await client.storage
    .from("products")
    .remove([imageStr])
  if (!error) {
  }
}

const isStillUploadingImage = computed(() => {
  return form.value.images.findIndex((i) => i.startsWith("data")) != -1
    ? true
    : false
})

const isPreviewMd = ref(false)

const route = useRoute()
const router = useRouter()
const fetchData = async () => {
  const data = await $fetch("/api/project", {
    method: "POST",
    body: { name: route.params.name },
  })

  if (data) {
    form.value = data
  }
}
fetchData()
</script>
