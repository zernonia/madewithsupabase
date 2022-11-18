import type { Database } from "~~/database.types"
export const useSupabase = () => {
  return useSupabaseClient<Database>()
}
