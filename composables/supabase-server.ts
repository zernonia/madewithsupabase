import type { Database } from "~~/database.types"
import { serverSupabaseServiceRole } from "#supabase/server"

export const useSupabaseServer = serverSupabaseServiceRole<Database>
