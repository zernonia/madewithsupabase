<script setup lang="ts">
import type { PropType } from 'vue'
import { movePosition, slugify } from '~~/functions'

const props = defineProps({
  modelValue: { type: Array as PropType<string[]>, default: () => [] },
  title: String,
})

const emits = defineEmits(['update:modelValue'])

const client = useSupabase()

const target = ref<HTMLInputElement>()
function pickFile(e: any) {
  const files = target.value?.files as FileList

  if (files.length) {
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader()
      reader.onload = async (e) => {
        const result = e.target?.result as string
        const r = (Math.random() + 1).toString(36).substring(7)
        const index = props.modelValue.length ?? 0
        const images = props.modelValue
        images[index] = result
        emits('update:modelValue', images)
        const title = slugify(`${props.title}-${r}-${files[i].name}`)
        const { data } = await client.storage
          .from('products')
          .upload(title, files[i], { upsert: true })
        if (data) {
          const {
            data: { publicUrl },
          } = client.storage.from('products').getPublicUrl(title)
          if (publicUrl) {
            const newIndex = props.modelValue.findIndex(i => i === result)
            images[newIndex] = publicUrl
            emits('update:modelValue', images)
          }
        }
      }
      reader.readAsDataURL(files[i])
    }
  }
}

async function removeImage(index: number) {
  const imageStr = props.modelValue[index].split('products/')[1]
  props.modelValue.splice(index, 1)
  const { data, error } = await client.storage
    .from('products')
    .remove([imageStr])
}

function changePosition(index: number, direction: 'left' | 'right') {
  const images = props.modelValue
  movePosition(images, index, direction === 'left' ? index - 1 : index + 1)
  emits('update:modelValue', images)
}
</script>

<template>
  <div class="h-64 flex rounded-md">
    <div
      v-if="modelValue.length"
      id="form-image"
      class="w-full h-full flex overflow-hidden overflow-x-auto bg-gray-500 bg-opacity-25 border-b-4 border-dark border-gray-500 border-opacity-10 transition duration-500 outline-none focus:shadow-xl rounded-2xl"
    >
      <div
        tabindex="0"
        class="rounded-xl h-64 w-64 text-white cursor-pointer flex flex-shrink-0 flex-col items-center justify-center border-gray-500 border-b-4 outline-none ring-1 ring-transparent"
        @keypress.enter="target?.click()"
        @click="target?.click()"
      >
        <div class="w-12 h-12 i-mdi:plus" />
        <p>Click to 'Add' images</p>
        <input
          ref="target"
          class="hidden"
          type="file"
          multiple
          accept="image/*"
          @input="pickFile"
        >
      </div>
      <div
        v-for="(blob, index) in modelValue"
        class="ml-2 flex-shrink-0 relative hover:children:block"
      >
        <span class="absolute bottom-2 left-2 px-2 rounded-xl bg-gray-200">{{
          index === 0 ? "Cover" : index + 1
        }}</span>
        <div
          v-if="blob.startsWith('http')"
          class="absolute w-full h-full center"
        >
          <button
            class="absolute bottom-2 right-2 flex items-center justify-center p-1 rounded-xl bg-red-500 hover:bg-red-600"
            @click.prevent="removeImage(index)"
          >
            <div class="i-mdi:trash-can w-5 h-5" />
          </button>

          <div
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center space-x-2"
          >
            <button
              v-if="index !== 0"
              class="p-0.5 rounded-xl bg-gray-200 hover:bg-gray-500"
              @click.prevent="changePosition(index, 'left')"
            >
              <div class="i-ic:baseline-arrow-left w-8 h-8" />
            </button>
            <button
              v-if="index !== modelValue.length - 1"
              class="p-0.5 rounded-xl bg-gray-200 hover:bg-gray-500"
              @click.prevent="changePosition(index, 'right')"
            >
              <div class="i-ic:baseline-arrow-right w-8 h-8" />
            </button>
          </div>
        </div>
        <div
          v-else
          class="absolute w-full h-full center bg-gray-900 bg-opacity-25"
        >
          <button
            class="flex flex-col items-center justify-center w-full h-full"
            @click.prevent=""
          >
            <SVGCircle class="animate-ping w-16" />
          </button>
        </div>
        <img :src="blob" class="h-full w-auto rounded-md">
      </div>
    </div>
    <div
      v-else
      id="form-image"
      tabindex="0"
      class="cursor-pointer w-full flex flex-col items-center justify-center bg-gray-500 bg-opacity-25 border-b-4 border-dark border-gray-500 border-opacity-10 transition duration-500 outline-none focus:shadow-xl rounded-2xl"
      @keypress.enter="target?.click()"
      @click="target?.click()"
    >
      <div class="w-12 h-12 i-mdi:plus" />
      <p>Click to 'Add' images</p>
      <input
        ref="target"
        class="hidden"
        type="file"
        multiple
        accept="image/*"
        @input="pickFile"
      >
    </div>
  </div>
</template>
