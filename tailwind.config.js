import aspectRatio from '@tailwindcss/aspect-ratio'
import typography from '@tailwindcss/typography'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './styles/**/*.{css,scss}',
  ],
  safelist: [
    'pb-4',
    'grid-cols-1',
    'grid-cols-2',
    'grid-cols-3',
    'grid-cols-4',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: '#008000',
          10: '#0080001A',
          25: '#00800040',
          50: '#00800080',
          75: '#008000BF',
          90: '#008000E6',
          100: '#008000FF',
        },
        "logo-green": "#008000",
        "logo-green-dark": "#165016",
        "logo-green-bright": "#4a0",
        "logo-grey-light": "#b3b3b3",
      }
    }
  },
  plugins: [aspectRatio, typography],
}
