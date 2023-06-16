export default defineNuxtRouteMiddleware((to) => {
  const previousHackathonPaths = ['/bring-the-func', '/flutter-hackathon', '/hacktoberfest', '/holiday-hackdays', '/launch-week-5', '/launch-week-6', '/launch-week-7']

  if (previousHackathonPaths.includes(to.path))
    return navigateTo(`/hackathons${to.path}`)
})
