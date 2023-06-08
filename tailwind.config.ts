import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        main: [
          'custom-font, BlinkMacSystemFont, -apple-system, Segoe UI, Roboto,  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, Helvetica,  Arial, sans-serif',
        ],
      },
    },
  },
}
