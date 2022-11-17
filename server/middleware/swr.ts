export default defineEventHandler((event) => {
  event.res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate")
})
