import { useSupabaseServer } from '~~/composables/supabase'

export default defineEventHandler(async (event) => {
  const { name } = getQuery(event)
  const client = useSupabaseServer()

  let rpc: 'get_tags' | 'get_supabase_tags' = 'get_tags'
  if (name?.toString().toLowerCase().startsWith('supabase'))
    rpc = 'get_supabase_tags'

  if (name) {
    const { data, error } = await client
      .rpc(rpc, { tag: name.toString() }, { count: 'exact' })
      .order('views', { ascending: false })

    if (data)
      return data

    else
      sendError(event, new Error('No data found'))
  }
  sendError(event, new Error('No name found'))
})
