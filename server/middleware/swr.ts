export default defineEventHandler((event) => {
  event.node.res.setHeader(
    "Cache-Control",
    "s-maxage=3600, stale-while-revalidate"
  )
})
