<script setup lang="ts">
import { PropType } from "vue"
import { slugify, movePosition } from "~~/functions"
const client = useSupabase()

const props = defineProps({
  modelValue: { type: Object as PropType<string[]>, default: () => [] },
  title: String,
})

const emits = defineEmits(["update:modelValue"])

const target = ref<HTMLInputElement>()
const pickFile = (e: any) => {
  let files = target.value?.files as FileList

  if (files.length) {
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader()
      reader.onload = async (e) => {
        const result = e.target?.result as string
        let r = (Math.random() + 1).toString(36).substring(7)
        let index = props.modelValue.length ?? 0
        let images = props.modelValue
        images[index] = result
        emits("update:modelValue", images)
        const title = slugify(props.title + "-" + r + "-" + files[i].name)
        const { data } = await client.storage
          .from("products")
          .upload(title, files[i], { upsert: true })
        if (data) {
          const {
            data: { publicUrl },
          } = client.storage.from("products").getPublicUrl(title)
          if (publicUrl) {
            let newIndex = props.modelValue.findIndex((i) => i == result)
            images[newIndex] = publicUrl
            emits("update:modelValue", images)
          }
        }
      }
      reader.readAsDataURL(files[i])
    }
  }
}

const removeImage = async (index: number) => {
  let imageStr = props.modelValue[index].split("products/")[1]
  props.modelValue.splice(index, 1)
  const { data, error } = await client.storage
    .from("products")
    .remove([imageStr])
  if (!error) {
  }
}

const changePosition = (index: number, direction: "left" | "right") => {
  let images = props.modelValue
  movePosition(images, index, direction == "left" ? index - 1 : index + 1)
  emits("update:modelValue", images)
}
</script>

<template>
  <div class="h-64 flex rounded-md">
    <div
      v-if="modelValue.length"
      class="w-full h-full flex overflow-hidden overflow-x-auto bg-dark-500 bg-opacity-25 border-b-4 border-dark border-dark-500 border-opacity-10 transition duration-500 outline-none focus:shadow-xl rounded-2xl"
    >
      <div
        tabindex="0"
        @keypress.enter="target?.click()"
        @click="target?.click()"
        class="rounded-xl h-64 w-64 text-light-900 cursor-pointer flex flex-shrink-0 flex-col items-center justify-center border-dark-500 border-b-4 outline-none ring-1 ring-transparent"
      >
        <div class="w-12 h-12 i-mdi:plus"></div>
        <p>Click to 'Add' images</p>
        <input
          class="hidden"
          ref="target"
          type="file"
          multiple
          @input="pickFile"
          accept="image/*"
        />
      </div>
      <div
        v-for="(blob, index) in modelValue"
        class="ml-2 flex-shrink-0 relative hover:children:block"
      >
        <span class="absolute bottom-2 left-2 px-2 rounded-xl bg-dark-200">{{
          index == 0 ? "Cover" : index + 1
        }}</span>
        <div
          v-if="blob.startsWith('http')"
          class="absolute w-full h-full center"
        >
          <button
            @click.prevent="removeImage(index)"
            class="absolute bottom-2 right-2 flex items-center justify-center p-1 rounded-xl bg-red-500 hover:bg-red-600"
          >
            <div class="i-mdi:trash-can w-5 h-5"></div>
          </button>

          <div
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center space-x-2"
          >
            <button
              @click.prevent="changePosition(index, 'left')"
              v-if="index != 0"
              class="p-0.5 rounded-xl bg-dark-200 hover:bg-dark-500"
            >
              <div class="i-ic:baseline-arrow-left w-8 h-8"></div>
            </button>
            <button
              @click.prevent="changePosition(index, 'right')"
              v-if="index != modelValue.length - 1"
              class="p-0.5 rounded-xl bg-dark-200 hover:bg-dark-500"
            >
              <div class="i-ic:baseline-arrow-right w-8 h-8"></div>
            </button>
          </div>
        </div>
        <div
          v-else
          class="absolute w-full h-full center bg-dark-900 bg-opacity-25"
        >
          <button
            @click.prevent=""
            class="flex flex-col items-center justify-center w-full h-full"
          >
            <SVGCircle class="animate-ping w-16"></SVGCircle>
          </button>
        </div>
        <img :src="blob" class="h-full w-auto rounded-md" />
      </div>
    </div>
    <div
      tabindex="0"
      @keypress.enter="target?.click()"
      @click="target?.click()"
      v-else
      class="cursor-pointer w-full flex flex-col items-center justify-center bg-dark-500 bg-opacity-25 border-b-4 border-dark border-dark-500 border-opacity-10 transition duration-500 outline-none focus:shadow-xl rounded-2xl"
    >
      <div class="w-12 h-12 i-mdi:plus"></div>
      <p>Click to 'Add' images</p>
      <input
        class="hidden"
        ref="target"
        type="file"
        multiple
        @input="pickFile"
        accept="image/*"
      />
    </div>
  </div>
</template>
