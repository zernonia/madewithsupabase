// tooltip
import '@/assets/tooltip.css'
import type { DirectiveBinding } from 'vue'

function init(el: Element, binding: DirectiveBinding) {
  const position = binding.arg || 'top'
  const tooltipText = binding.value || 'Tooltip text'
  el.setAttribute('position', position)
  el.setAttribute('tooltip', tooltipText)
}

export default defineNuxtPlugin((nuxt) => {
  nuxt.vueApp.directive('tooltip', {
    mounted(el, binding) {
      init(el, binding)
    },
    updated(el, binding) {
      init(el, binding)
    },
  })
})
