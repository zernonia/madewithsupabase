import { useSupabaseServer } from '~~/composables/supabase'

export default defineEventHandler(async (event) => {
  const { form } = await readBody(event)
  const client = useSupabaseServer()

  const { data, error } = await client
    .from('products')
    .upsert(form)
    .select('slug')
    .single()
  return { data, error }
})
