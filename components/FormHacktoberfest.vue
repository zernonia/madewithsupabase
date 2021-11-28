<template>
  <div class="flex justify-center">
    <form onsubmit="return false" class="flex flex-col space-y-4 p-4 md:p-8 rounded-md w-full max-w-screen-lg">
      <h1 id="form" class="text-4xl sm:text-5xl text-emerald-300 text-center mt-8">Submission</h1>
      <div class="flex flex-col">
        <label for="title">title *</label>
        <input name="title" type="text" v-model="form.title" required placeholder="My Project" />
      </div>
      <div class="flex flex-col">
        <label for="url">Demo URL *</label>
        <input
          name="url"
          type="url"
          v-model="form.url"
          required
          placeholder="https://www.supabase.io - or - https://www.github.com/supabase/supabase"
        />
      </div>
      <div class="flex flex-col">
        <label for="github_url">(Public) github URL *</label>
        <input
          name="github_url"
          type="text"
          required
          v-model="form.github_url"
          placeholder="https://www.github.com/supabase/supabase"
        />
      </div>
      <div class="flex flex-col">
        <div class="flex justify-between items-center">
          <label for="description">description (Markdown Supported) * </label>
          <div class="flex space-x-2">
            <button @click.prevent="isPreviewMd = true" class="hover:underline" v-if="!isPreviewMd">Preview</button>
            <button @click.prevent="isPreviewMd = false" class="hover:underline" v-else>Edit</button>
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
        <label class="normal-case" for="images">Image (First image will be set as Main)</label>
        <div class="h-64 flex rounded-md">
          <div v-if="form.images.length" class="w-full h-full flex overflow-hidden overflow-x-auto">
            <div
              @click="target?.click()"
              class="
                h-64
                w-64
                text-light-900
                cursor-pointer
                flex flex-shrink-0 flex-col
                items-center
                justify-center
                border-dark-500 border-2 border-dashed
              "
            >
              <i-mdi:plus class="w-12 h-12"></i-mdi:plus>
              <p>Click to 'Add' images</p>
              <input class="hidden" ref="target" type="file" @input="pickFile" accept="image/*" />
            </div>
            <div v-for="(blob, index) in form.images" class="ml-2 flex-shrink-0 relative hover:children:block">
              <div
                v-if="blob.startsWith('http')"
                class="absolute w-full h-full center hidden hover:bg-dark-900 hover:bg-opacity-25"
              >
                <button
                  @click.prevent="removeImage(index)"
                  class="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                >
                  <i-mdi:trash-can class="w-12 h-12"></i-mdi:trash-can>
                  Click to 'Remove' image
                </button>
              </div>
              <div v-else class="absolute w-full h-full center bg-dark-900 bg-opacity-25">
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
            class="
              text-light-900
              cursor-pointer
              w-full
              flex flex-col
              items-center
              justify-center
              border-dark-500 border-2 border-dashed
            "
          >
            <i-mdi:plus class="w-12 h-12"></i-mdi:plus>
            <p>Click to 'Add' images</p>
            <input class="hidden" ref="target" type="file" @input="pickFile" accept="image/*" />
          </div>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row sm:items-center justify-between">
        <div class="flex flex-col sm:w-1/2">
          <label for="email" class="normal-case">Team Captain's Email *</label>
          <input name="email" type="email" required v-model="form.email" placeholder="madewithsupabase@gmail.com" />
        </div>
        <div class="flex flex-col sm:w-1/2 sm:ml-4">
          <label for="twitter">Team Captain's Twitter handle</label>
          <div class="flex items-center">
            <span class="text-xl mr-2">@</span>
            <input class="w-full" name="twitter" type="text" v-model="form.twitter" placeholder="madewithsupabase" />
          </div>
        </div>
      </div>

      <div class="!mt-12 px-6 py-4 bg-dark-600 rounded-lg">
        <p>
          Any intellectual property developed during the hackathon will belong to the team that developed it. We expect
          that each team will have an agreement between themselves regarding the IP, but this is not required
        </p>
        <div class="mt-2 flex items-center space-x-4">
          <input
            class="
              rounded
              form-checkbox
              cursor-pointer
              h-5
              w-5
              text-emerald-500
              focus:ring-emerald-400 focus:ring-offset-transparent
            "
            type="checkbox"
            name="acknowledge"
            id="acknowledge"
            required
            v-model="terms.acknowledge"
          />
          <label class="!text-base text-light-900" for="acknowledge">Acknowledge</label>
        </div>

        <p class="mt-8">
          By making a submission you grant Supabase permission to use screenshots, code-snippets and/or links to your
          project or content of your README on our twitter, blog, website, email updates, and in the Supabase discord
          server. Supabase does not make any claims over your IP.
        </p>
        <div class="mt-2 flex items-center space-x-4">
          <input
            class="
              rounded
              form-checkbox
              cursor-pointer
              h-5
              w-5
              text-emerald-500
              focus:ring-emerald-400 focus:ring-offset-transparent
            "
            type="checkbox"
            name="accept"
            id="accept"
            required
            v-model="terms.accept"
          />
          <label class="!text-base text-light-900" for="accept">Accept</label>
        </div>
      </div>

      <div class="w-full !mt-8 flex justify-center">
        <button
          :disabled="isSubmitting || isStillUploadingImage"
          class="
            w-max
            bg-gradient-to-tr
            from-emerald-600
            to-emerald-400
            px-6
            py-3
            rounded-lg
            inline-flex
            items-center
            focus:ring focus:ring-emerald-500
            hover:ring hover:ring-emerald-500
          "
          @click="submit"
        >
          Submit Project <SVGCircle v-if="isSubmitting" class="w-4 h-4 ml-4 animate-ping"></SVGCircle>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const { $supabase } = useNuxtApp()
import SVGCircle from "./SVGCircle.vue"

const emit = defineEmits(["submit"])
const isSubmitting = ref(false)
const terms = ref({
  acknowledge: false,
  accept: false,
})
const form = ref({
  title: "",
  email: "",
  description: "",
  categories: ["Hacktoberfest"],
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

  var from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;"
  var to = "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------"
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i))
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
  return str
}

const submit = async () => {
  const regexUrl =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
  if (
    form.value.title &&
    form.value.url.match(regexUrl) &&
    form.value.description &&
    form.value.email &&
    terms.value.acknowledge &&
    terms.value.accept
  ) {
    isSubmitting.value = true
    form.value.slug = slugify(form.value.title)
    const { data, error } = await fetch(`../api/function/submission`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        form: form.value,
      }),
    }).then((res) => res.json())

    if (!error) emit("submit", form.value.slug)
    isSubmitting.value = false
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
        const title = form.value.title + "-" + r + "-" + files[i].name
        const { data } = await $supabase.storage.from("products").upload(title, files[i], { upsert: true })
        if (data) {
          const { publicURL } = $supabase.storage.from("products").getPublicUrl(title)
          if (publicURL) {
            let newIndex = form.value.images.findIndex((i) => i == result)
            form.value.images[newIndex] = publicURL
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
  const { data, error } = await $supabase.storage.from("products").remove([imageStr])
  if (!error) {
  }
}

const isStillUploadingImage = computed(() => {
  return form.value.images.findIndex((i) => i.startsWith("data")) != -1 ? true : false
})

const isPreviewMd = ref(false)
</script>

<style scoped lang="postcss">
label {
  @apply my-1 text-lg;
}
</style>
