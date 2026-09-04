/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        mono: ['Space Mono', 'monospace'],
        handwriting: ['Caveat', 'cursive'],
        zentry: ['zentry', 'sans-serif'],
        'circular-web': ['circular-web', 'sans-serif'],
        'robert-regular': ['robert-regular', 'sans-serif'],
        'robert-medium': ['robert-medium', 'sans-serif'],
        general: ['general', 'sans-serif'],
        'ncl-gasdrifo': ['NCLGasdrifo', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
