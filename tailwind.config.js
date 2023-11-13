/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      screens: {
        'xl': '1280px',  // Custom breakpoint for 'xl'
        'lg': '1024px',  // Custom breakpoint for 'lg'
        'md': '768px',   // Custom breakpoint for 'md'
        'sm': '640px',   // Custom breakpoint for 'sm'
        'xs': '200px',   // Custom breakpoint for 'xs'



        // => @media (min-width: 640px) { ... }
      }

    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss'),
    require('autoprefixer')

  ],
}

