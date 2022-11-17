import { supabase } from "../../_lib/supabase"

export default defineEventHandler(async (event) => {
  const data = Promise.all([
    supabase
      .from("products_view")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(3),
    supabase
      .from("products_view")
      .select("*")
      .or(
        "id.eq.c7231413-02b5-4549-ad9f-130370609f97, id.eq.da351848-1264-4925-8ee9-8c87ae8e77da, id.eq.960edf58-5994-4825-9d85-82d83d122ade"
      ),
  ])

  if (data) {
    return data
  } else {
    event.res.statusCode = 500
    return
  }
})
