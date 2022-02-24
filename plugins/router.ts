import { defineNuxtPlugin } from "#app"
import { RouterScrollBehavior } from "vue-router"
export default defineNuxtPlugin(({ $router }) => {
  //@ts-ignore
  const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
    if (to.params.position) {
      return { top: to.params.position }
    } else if (savedPosition) {
      return new Promise((resolve) => {
        setTimeout(() => resolve({ top: savedPosition.top }), 350)
      })
    } else {
      return new Promise((resolve) => {
        setTimeout(() => resolve({ top: 0 }), 250)
      })
    }
  }

  $router.options.scrollBehavior = scrollBehavior
})
