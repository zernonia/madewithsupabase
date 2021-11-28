export const useCustomMeta = (
  title = "Showcase ⚡ Made with Supabase",
  description = "A collection of projects made with Supabase – Websites, Mobile Apps, SaaS, Plugins and more!",
  image = "https://www.madewithsupabase.com/og.png"
) => {
  return {
    title,
    meta: [
      {
        name: "description",
        content: description,
      },
      { name: "og:title", content: title },
      { name: "og:site_name", content: title },
      {
        name: "og:description",
        content: description,
      },
      { name: "og:type", content: "website" },
      { name: "og:url", content: "https://www.madewithsupabase.com/" },
      { name: "og:image", content: image },

      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@madewifsupabase" },
      { name: "twitter:creator", content: "@madewifsupabase" },
      { name: "twitter:title", content: title },
      {
        name: "twitter:description",
        content: description,
      },
      { name: "twitter:image", content: image },
    ],
  }
}
