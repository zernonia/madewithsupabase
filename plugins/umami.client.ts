import { defineNuxtPlugin } from "#app"

export default defineNuxtPlugin(() => {
  const moduleOptions = {
    websiteId: "545e8bc4-f448-4790-8f28-eaa11d690fb4",
    scriptUrl: "https://umami-zernonia.vercel.app/umami.js",
  }
  const options = { ...moduleOptions }

    if (!process.dev) {
      loadScript(options)
    }
})

function loadScript(options: any) {
    const head = document.head || document.getElementsByTagName("head")[0]
    const script = document.createElement("script")

    script.async = true
    script.defer = true
    script.dataset.websiteId = options.websiteId
    script.src = options.scriptUrl

    head.appendChild(script)
}
