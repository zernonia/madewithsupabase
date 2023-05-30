import { cp } from 'node:fs/promises'
import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  setup(options, nuxt) {
    nuxt.hook('close', async () => {
      await cp(
        'assets/fonts',
        '.vercel/output/functions/__nitro.func/assets/fonts',
        { recursive: true },
      )
    })
  },
})
