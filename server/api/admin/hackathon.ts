import { useSupabaseServer } from '~~/composables/supabase'

export default defineEventHandler(async (event) => {
  const { hackathon } = await readBody(event)
  if (!hackathon)
    return { error: 'No slug found' }

  const client = useSupabaseServer()
  const { data, error } = await client.from('products').select('*').contains('categories', [hackathon])

  if (!error && data) {
    return data
  }
  else {
    event.res.statusCode = 500
    return { error }
  }
})
