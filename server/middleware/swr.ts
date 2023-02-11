export default defineEventHandler((event) => {
  const url = event.node.req.url
  if (!url?.includes("/api/project?")) {
    event.node.res.setHeader(
      "Cache-Control",
      "s-maxage=3600, stale-while-revalidate"
    )
  }
})
