import { readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { Buffer } from 'node:buffer'
import { satori } from 'v-satori'
import { Resvg } from '@resvg/resvg-js'
import { useSupabaseServer } from '~~/composables/supabase'
import OG from '~~/components/OG.vue'

export default eventHandler(async (event) => {
  const name = event.context.params?.name
  if (!name)
    return sendError(event, new Error('No name is found'))

  const client = useSupabaseServer()
  const { data } = await client
    .from('products')
    .select('title, twitter, images')
    .eq('slug', name)
    .single()

  const buffer = readFileSync(
    join(process.cwd(), 'assets/fonts/', 'custom-font.ttf'),
  )

  const svg = await satori(OG, {
    props: {
      title: data?.title ?? '',
      author: data?.twitter ?? '',
      cover_img: data?.images?.[0],
    },
    width: 1200,
    height: 627,
    fonts: [
      {
        name: 'custom-font',
        data: buffer,
        weight: 400,
        style: 'normal',
      },
    ],
  })

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: 1200,
    },
    font: {
      fontFiles: [join(resolve('.'), 'assets/fonts', 'custom-font.ttf')], // Load custom fonts.
      loadSystemFonts: false,
    },
  })

  const resolved = await Promise.all(
    resvg.imagesToResolve().map(async (url) => {
      // console.info('image url', url)
      const img = await fetch(url)
      const buffer = await img.arrayBuffer()
      return {
        url,
        buffer: Buffer.from(buffer),
      }
    }),
  )
  if (resolved.length > 0) {
    for (const result of resolved) {
      const { url, buffer } = result
      resvg.resolveImage(url, buffer)
    }
  }

  const renderData = resvg.render()
  const pngBuffer = renderData.asPng()

  setHeader(event, 'Cache-Control', 's-maxage=7200, stale-while-revalidate')
  return pngBuffer
})
