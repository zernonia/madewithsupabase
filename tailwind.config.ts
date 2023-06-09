import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        main: ['Inter', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            'code': {
              backgroundColor: 'rgb(var(--color-gray-800))',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.375rem',
              border: '1px solid rgb(var(--color-gray-700))',
            },
            'code::before': {
              content: '',
            },
            'code::after': {
              content: '',
            },
            'blockquote p:first-of-type::before': {
              content: '',
            },
            'blockquote p:last-of-type::after': {
              content: '',
            },
          },
        },
      },
    },
  },
  content: ['formkit.config.ts'],
}
