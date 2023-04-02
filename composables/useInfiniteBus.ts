import { useEventBus, useInfiniteScroll } from "@vueuse/core"

export const useInfiniteBus = () => {
  const el = useState("container-el", () => null)
  const bus = useEventBus<string>("scroll")

  useInfiniteScroll(el, () => bus.emit("infinite-scroll"), { distance: 10 })

  return {
    el,
    bus,
  }
}
