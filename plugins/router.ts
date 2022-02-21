import { defineNuxtPlugin } from "#app"
import { RouterScrollBehavior } from "vue-router"
export default defineNuxtPlugin(({ $router }) => {
  //@ts-ignore
  const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
    if (to.hash) {
      console.log("Go to hash", to.hash)

      return {
        el: to.hash,
        top: 30,
        behavior: "smooth",
      }
    } else if (to.params.position) {
      return { top: to.params.position, behavior: "smooth" }
    } else if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: "smooth" }
    }
  }

  $router.options.scrollBehavior = scrollBehavior
})
