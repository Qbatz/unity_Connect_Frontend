/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        'lightgray':'#22222280',
         'lightblue':'#D9E9FF',
         '#7F00FF': '#7F00FF', 
         '#FAF9FF':'#FAF9FF',
         '#F4F7FF':'#F4F7FF',
         '#FFE8E8': '#FFE8E8',
         '#E8E8E8' : '#E8E8E8',
         '#D9E9FF': '#D9E9FF',
         '#FFEFCF': '#FFEFCF',
         '#222222' : '#222222',
         '#F2F4F8': '#F2F4F8',
         '#FFDDDB':'#FFDDDB',
         '#292D32':'#292D32'
         
      },
    
      fontFamily: {
        'Outfit': ["Outfit", "sans-serif"],
        'Gilroy': ['Gilroy', 'sans-serif'],
        'Raleway': ["Raleway", "sans-serif"],
        'kalam': ['Kalam', 'cursive'],
      },
     
      colors: {
        darkGray: "#222222",
        grayCustom: "#939393",
      },
      lineHeight: {
        '18.83': '18.83px', 
        '19.09':'19.09',
        '32px': '32px',
      },
      fontSize: {

        '60': '60px',
        '80':'80px',
      },
      width: {
        '24':'24px',
        '32':'32px',
        '100':'100px',
        '120': '120px',
        '150': '150px',
        '155':'155px',
        '161':'161px',
        '180': '180px',
        '200':'200px',
        '218':'218px',
        '232':'232px',
        '310':'310px',
        '350':'350px',
        '464':'464px',
        '500':'500px',
      },
      height: {
        '2':'2px',
        '24':'24px',
        '32':'32px',
        '51':'51px',
        '59': '59px', 
        '60':'60px',
        '85':'85px',
        '90':'90px',
        '170':'170px',
        '217':'217px',
      },
      spacing: {
        '16':'16px',
        '22':'22px',
        '24':'24px',
        '30':'30px',
        '32':'32px',
        '40': '40px',
        '45':'45px',
        '50':'50px', 
        '60': '60px', 
        '72':'72px',
        '80': '80px', 
        '96':'96px',
        '100':'100px',
        '200':'200px'
      },
      lineHeight: {
        '28.8':'28.8px',
        '38.4':'38.4px',
        '67.2': '67.2px',
        '140.59':'140.59px',
        '205.12':'205.12px',
      },
      gap: {
        '200': '200px',
      },
      borderRadius: {
        '40':'40px',
        '60': '60px',
      },
      colors: {
        'lightgray' :'#939393',
        

      }
    },
  },
  plugins: [],
}