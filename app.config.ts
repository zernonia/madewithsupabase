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
      padding: 'p-0 sm:p-4',
    },
    badge: {
      rounded: 'rounded-lg',
    },
    selectMenu: {
      rounded: 'rounded-lg',
    },
    select: {
      rounded: 'rounded-lg',
      placeholder: 'text-gray-900 dark:text-dark-600',
      default: {
        size: 'md',
      },
    },
    input: {
      rounded: 'rounded-lg',
      default: {
        size: 'md',
      },
    },
    tooltip: {
      base: 'invisible lg:visible h-6 px-2 py-1 text-xs font-normal truncate border border-gray-700 text-gray-100',
    },
  },
})
