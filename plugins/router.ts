import { defineNuxtPlugin } from "#app"
import { RouterScrollBehavior } from "vue-router"
export default defineNuxtPlugin(({ $router }) => {
  //@ts-ignore
  const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
    if (to.params.position) {
      return { top: to.params.position, behavior: "smooth" }
    } else if (savedPosition) {
      return new Promise((resolve) => {
        setTimeout(() => resolve({ top: savedPosition.top }), 300)
      })
    } else {
      return { top: 0, behavior: "smooth" }
    }
  }

  $router.options.scrollBehavior = scrollBehavior
})
