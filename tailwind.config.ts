import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#E8531E',
      },
      fontFamily: {
        sans:    ['Josefin Sans', 'system-ui', 'sans-serif'],
        display: ['Yeseva One', 'Georgia', 'serif'],
        mono:    ['Space Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
