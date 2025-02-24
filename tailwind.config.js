/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        'lightgray':'#22222280',
       

      },
    
      fontFamily: {
        'Outfit': ["Outfit", "sans-serif"],
        'Gilroy': ['Gilroy', 'sans-serif'],
        'Raleway': ["Raleway", "sans-serif"],
      },
      colors: {
        'lightgray' :'#939393',
        

      }
    },
  },
  plugins: [],
}