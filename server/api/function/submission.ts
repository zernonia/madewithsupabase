import { useSupabaseServer } from '~~/composables/supabase'

export default defineEventHandler(async (event) => {
  const { form } = await readBody(event)
  const client = useSupabaseServer()
  form.approved = form.id ? form.approved : false

  const { data, error } = await client
    .from('products')
    .upsert(form)
    .select()
    .single()
  if (!error && data) {
    return { success: true }
  }
  else {
    event.res.statusCode = 500
    return { error }
  }
})
