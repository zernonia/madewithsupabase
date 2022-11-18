import type { Database } from "~~/database.types"

export const useSupabase = () => useSupabaseClient<Database>()
