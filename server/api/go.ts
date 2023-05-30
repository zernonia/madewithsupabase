import { useSupabaseServer } from '~~/composables/supabase'

export default defineEventHandler(async (event) => {
  const client = useSupabaseServer()
  const { res } = event.node
  const { name } = getQuery(event)
  if (name) {
    const initialData = await client
      .from('products')
      .select('*')
      .eq('slug', name)
      .single()
    if (!initialData.error) {
      const redirect_url = `${initialData.data.url}?ref=madewithsupabase`
      res.writeHead(302, {
        Location: redirect_url,
      })
      res.end()
    }
    else {
      res.statusCode = 500
      res.end('No project found')
    }
  }
  else {
    res.statusCode = 500
    res.end('No project found')
  }
})
