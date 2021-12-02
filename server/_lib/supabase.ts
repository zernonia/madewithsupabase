import { createClient } from "@supabase/supabase-js"

const url = process.env.SUPABASE_URL as string
const key = process.env.SUPABASE_SERVICE_KEY as string

export const supabase = createClient(url, key)
