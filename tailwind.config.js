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
      colors: {
        green: {
          DEFAULT: '#028103', // default green color
          10: '#0281031A',    // 10% opacity
          25: '#02810340',    // 25% opacity
          50: '#02810380', // 50% opacity
          75: '#028103BF', // 75% opacity
          90: '#028103E6', // 90% opacity
          100: '#028103FF', // 100% opacity
        },
      },
    },
  },
  plugins: [aspectRatio],
}
