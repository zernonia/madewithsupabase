export default defineAppConfig({
  ui: {
    primary: 'emerald',
    gray: 'stone',
    notifications: {
      // Show toasts at the top right of the screen
      position: 'top-0 right-0',
    },
    modal: {
      base: 'relative text-left overflow-hidden sm:my-16 mx-8 border border-gray-700',
      rounded: 'rounded-2xl',
      background: 'bg-white dark:bg-gray-800',
      width: 'max-w-[56rem]',
      shadow: 'shadow-2xl',
    },
  },
})
