// tooltip
import "@/assets/tooltip.css"
import { App, DirectiveBinding } from "vue"

function init(el: Element, binding: DirectiveBinding) {
  let position = binding.arg || "top"
  let tooltipText = binding.value || "Tooltip text"
  el.setAttribute("position", position)
  el.setAttribute("tooltip", tooltipText)
}

export default function (app: App) {
  app.directive("tooltip", {
    mounted(el, binding) {
      init(el, binding)
    },
    updated(el, binding) {
      init(el, binding)
    },
  })
}
