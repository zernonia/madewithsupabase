<template>
  <div>
    <CustomMeta
      :title="'Launch Week 5 Hackathon | Made with Supabase'"
      :image="HeroImage"
    />
    <transition name="fade" appear>
      <main class="py-8">
        <section class="md:py-6 px-4 flex flex-col items-center">
          <NuxtLink
            to="/"
            class="fixed left-0 top-5 px-4 md:px-6 py-4 rounded-r-full bg-dark-300"
          >
            <i-mdi:chevron-left></i-mdi:chevron-left>
          </NuxtLink>

          <div class="relative group">
            <NuxtLink
              to="https://supabase.com/blog/launch-week-5-hackathon-winners"
              target="_blank"
            >
              <img
                class="w-full object-cover object-top max-w-screen-md rounded-xl border-3 border-yellow-400 transform scale-100 hover:scale-102 transition-all"
                src="~~/assets/launch-week-5-hackathon.jpeg"
                alt="Supabase Launch Week 5 Hackathon"
              />
            </NuxtLink>
          </div>
          <section class="mt-12 md:mt-20">
            <h2
              class="text-4xl md:text-5xl text-center mb-4 sm:mb-16 text-emerald-400"
            >
              Submissions
            </h2>

            <transition name="fade" mode="out-in">
              <div v-if="!pending" class="card-grid">
                <Card v-for="item in data" :key="item.id" :item="item"></Card>
              </div>
              <div
                v-else
                class="w-full h-screen flex items-center justify-center"
              >
                <SVGCircle class="animate-ping"></SVGCircle>
              </div>
            </transition>
          </section>
        </section>
      </main>
    </transition>
  </div>
</template>

<script lang="ts">
export default {
  layout: "blank",
}
</script>

<script setup lang="ts">
const client = useSupabase()

const { data, pending, refresh } = useAsyncData(
  "launch-week-5-submission",
  async () => {
    const { data, error } = await client
      .from("launch_week_5_view")
      .select("*")
      .order("views", { ascending: false })

    return data
  },
  { lazy: true }
)
</script>
