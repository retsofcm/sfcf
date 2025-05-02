import aspectRatio from '@tailwindcss/aspect-ratio'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',  // This includes all files in the pages directory
    './components/**/*.{js,ts,jsx,tsx}',  // This includes all files in the components directory
    './app/**/*.{js,ts,jsx,tsx}',  // If you're using the `app` directory (Next.js 13+)
    './layouts/**/*.{js,ts,jsx,tsx}',  // If you have layouts directory
  ],
  theme: {
    extend: {
      spacing: {
        '30': '7.5rem', // 120px
      },
    },
  },
  plugins: [aspectRatio],
}
