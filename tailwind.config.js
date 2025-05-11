import aspectRatio from '@tailwindcss/aspect-ratio'
import typography from '@tailwindcss/typography'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',  // This includes all files in the pages directory
    './components/**/*.{js,ts,jsx,tsx}',  // This includes all files in the components directory
    './app/**/*.{js,ts,jsx,tsx}',  // If you're using the `app` directory (Next.js 13+)
    './layouts/**/*.{js,ts,jsx,tsx}',  // If you have layouts directory
    './styles/**/*.{css,scss}', // 👈 Add this line
  ],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: '#008000', // default green color
          10: '#0080001A',    // 10% opacity
          25: '#00800040',    // 25% opacity
          50: '#00800080', // 50% opacity
          75: '#008000BF', // 75% opacity
          90: '#008000E6', // 90% opacity
          100: '#008000FF', // 100% opacity
        },
      },
    },
  },
  plugins: [aspectRatio, typography],
}
