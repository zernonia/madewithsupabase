import { useSupabaseServer } from '~~/composables/supabase'

export default defineEventHandler(async (event) => {
  const { email, slug } = await readBody(event)
  const client = useSupabaseServer()
  let verify = false

  const { data } = await client
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()

  if (data?.email === email)
    verify = true

  return { verify }
})
