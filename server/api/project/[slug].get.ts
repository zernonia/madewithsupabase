import { useSupabaseServer } from '~~/composables/supabase'

export default defineEventHandler(async (event) => {
  const client = useSupabaseServer()
  const slug = event.context.params?.slug

  if (slug) {
    const { data, error } = await client
      .from('products')
      .select(
        'id, title, description, categories, url, github_url, twitter, instagram, images, slug, supabase_features',
      )
      .eq('slug', slug)
      .single()

    if (data)
      return data
    else
      return sendError(event, new Error(error.message))
  }
  return sendError(event, new Error('No slug is found'))
})
