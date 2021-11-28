import { reactive, computed } from "vue"
import { useWindowSize } from "@vueuse/core"

const { width } = useWindowSize()

export const state = reactive({
  tags: [] as any[],
  deviceWidth: computed(() => {
    if (width.value >= 1024) {
      return 1000
    } else if (width.value >= 768) {
      return 800
    } else {
      return 600
    }
  }),

  maxCount: 0,
})
