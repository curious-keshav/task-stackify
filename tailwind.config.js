/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'muted': "#262626",
        'muted-foreground': "#a1a1a1"
      }
    },
  },
  plugins: [],
}
