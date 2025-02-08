/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sharp-sans': ['Sharp Sans', 'sans-serif'],
      },
      backgroundColor:{
        'custom-dark' : '#141414'
      },
      screens:{
        'i-pad' : {'raw': '(min-height: 1000px) and (max-height : 1300px)'},
        'i-pad-mini' : {'raw': '(min-height: 900px) and (max-height : 1000px)'}
      }
    },
  },
  plugins: [
    function ({addUtilities}){
      addUtilities({
        '.scrollbar-none': {
          'scrollbar-width': 'none'
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          'display': 'none'
      },
      })
    }
  ],
}

