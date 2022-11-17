// tooltip
import "@/assets/tooltip.css"
import { DirectiveBinding } from "vue"

function init(el: Element, binding: DirectiveBinding) {
  let position = binding.arg || "top"
  let tooltipText = binding.value || "Tooltip text"
  el.setAttribute("position", position)
  el.setAttribute("tooltip", tooltipText)
}

export default defineNuxtPlugin((nuxt) => {
  nuxt.vueApp.directive("tooltip", {
    mounted(el, binding) {
      init(el, binding)
    },
    updated(el, binding) {
      init(el, binding)
    },
  })
})
