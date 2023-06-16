export function useTags() {
  const client = useSupabase()

  const supabaseFeatureOptions = [
    'Supabase Auth',
    'Supabase Database',
    'Supabase Function',
    'Supabase Storage',
    'Supabase Realtime',
  ]

  const { data: tagOptions } = useLazyAsyncData('tagOptions', async () => {
    const { data } = await client
      .from('tags_view')
      .select('*')
      .order('tags', {
        ascending: true,
      })

    return data?.map(i => i.tags ?? '') ?? []
  }, {
    server: false,
    default: () => [] as string[],
  })

  return {
    tagOptions,
    supabaseFeatureOptions,
  }
}
