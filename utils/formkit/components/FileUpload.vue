<script setup lang="ts">
import type { FormKitFrameworkContext } from '@formkit/core'
import type { FilePondFile, FilePondOptions, FilePondServerConfigProps } from 'filepond'
import vueFilePond from 'vue-filepond'

import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

const props = defineProps<{ context: FormKitFrameworkContext['node']['context'] }>()

const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
)

const client = useSupabaseClient()
const cfg = useRuntimeConfig()
const myFiles = ref<FilePondOptions['files']>([])

watchOnce(() => props.context?._value, (n: string[]) => {
  if (n?.length)
    myFiles.value = n.map(i => ({ source: i, options: { type: 'local' } }))
}, { immediate: true })

const bucketId = props.context?.attrs['bucket-id']
const storageUrl = `${cfg.public.SUPABASE_URL}/storage/v1/object/${bucketId}`

const server: FilePondServerConfigProps['server'] = {
  load: async (source, load, error, progress, abort) => {
    progress(true, 0, 1024)
    const { data } = await client.storage.from(bucketId).download(source.replace(`${bucketId}/`, ''))
    if (data)
      load(data)

    else
      error('oh my goodness')

    return {
      abort: () => { abort() },
    }
  },
  revert: async (uniqueFileId, load, error) => {
    const { error: err } = await client.storage.from(bucketId).remove([uniqueFileId.replace(`${bucketId}/`, '')])
    if (err)
      error(`${err.message}`)
    load()
  },
  // reference: https://pqina.nl/filepond/docs/api/server/#advanced
  process: (fieldName, file, metadata, load, error, progress, abort) => {
    const formData = new FormData()
    formData.append('cacheControl', '3600')
    formData.append(fieldName, file, file.name)

    const request = new XMLHttpRequest()

    request.open('POST', `${storageUrl}/${file.name}`)
    request.setRequestHeader('Apikey', `${cfg.public.SUPABASE_KEY}`)
    request.setRequestHeader('Authorization', `Bearer ${cfg.public.SUPABASE_KEY}`)
    request.setRequestHeader('X-Upsert', 'true')

    request.upload.onprogress = (e) => {
      progress(e.lengthComputable, e.loaded, e.total)
    }

    request.onload = function () {
      if (request.status >= 200 && request.status < 300)
        load(JSON.parse(request.responseText).Key)

      else
        error('oh no')
    }
    request.send(formData)

    return {
      abort: () => {
        request.abort()
        abort()
      },
    }
  },
}

function handleInput(files: FilePondFile[]) {
  if (!files || !files.map)
    return

  const keys = files.map(file => file.serverId).filter(Boolean)
  if (keys?.length)
    props.context?.node.input(keys)
}

const uploadCount = ref(0)
const uploadResolved = ref(0)

function handleAddNewFile(_: any, file: FilePondFile) {
  if (file.status <= 2)
    return

  uploadCount.value++
}

const isProcessing = computed(() => uploadCount.value !== uploadResolved.value)
watch(isProcessing, (n) => {
  if (!props.context?.node.parent?.context)
    return
  if (n)
    props.context.node.parent.context.disabled = true

  else
    props.context.node.parent.context.disabled = false
})
</script>

<template>
  <FilePond
    v-bind="context?.attrs"
    :label-idle="context?.attrs.placeholder"
    :disabled="!!context?.disabled"
    :server="server"
    :files="myFiles"
    accepted-file-types="image/jpeg, image/png, text/html"
    @processfile="uploadResolved++"
    @input="handleInput"
    @reorderfiles="handleInput"
    @addfile="handleAddNewFile"
  />
</template>

<style>
@import 'filepond/dist/filepond.min.css';
@import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

/* reference: https://pqina.nl/filepond/docs/api/style/#fonts-and-colors */
.filepond--root {
  @apply font-main;
}

.filepond--drop-label {
  @apply text-gray-100 !text-sm;
}

.filepond--label-action {
  @apply decoration-primary-400;
}

.filepond--file-action-button {
  @apply bg-gray-800
}

.filepond--file-action-button {
  @apply text-gray-100
}

.filepond--file-action-button:hover,
.filepond--file-action-button:focus {
  box-shadow: 0 0 0 0.125em rgba(255, 255, 255, 0.9);
}

.filepond--file {
  @apply text-gray-100
}

.filepond--item {
  @apply border rounded-lg overflow-hidden border-gray-700;
}

.filepond--panel-root {
  @apply bg-gray-900 border border-gray-700
}

.filepond--image-preview-overlay-idle {
  color: rgb(176 176 176 / 85%);
}
</style>
