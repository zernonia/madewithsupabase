<template>
  <div>
    <Html lang="en-US">
      <Head>
        <Title>{{ title }}</Title>
        <Meta name="description" :content="description" />

        <Meta name="og:title" :content="title" />
        <Meta name="og:site_name" :content="title" />
        <Meta name="og:description" :content="description" />
        <Meta name="og:type" content="website" />
        <Meta name="og:url" content="https://www.madewithsupabase.com/" />
        <Meta name="og:image" :content="image" />

        <Meta name="twitter:card" content="summary_large_image" />
        <Meta name="twitter:site" content="@madewifsupabase" />
        <Meta name="twitter:creator" content="@madewifsupabase" />
        <Meta name="twitter:title" :content="title" />
        <Meta name="twitter:description" :content="description" />
        <Meta name="twitter:image" :content="image" />
      </Head>
    </Html>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  description: {
    type: String,
    default:
      "A collection of projects made with Supabase – Websites, Mobile Apps, SaaS, Plugins and more!",
  },
  image: {
    type: String,
    default: "https://www.madewithsupabase.com/og.png",
  },
})
</script>
