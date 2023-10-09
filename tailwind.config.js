/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens:{
      'xs':"425px"
    },
    extend: {
      colors:{
        primary:{
          100:'#131416',
          200:'#2386bd',
          300:'#f7f7f7',
          400:'#0071BD'
        },
        secondary:{
          100:'#1c1e21',
          200:'#68e1fd',
          300:'rgb(255 255 255 / 10%)',
          400:"#e6f1f8",
        },
      },
      backgroundImage:{
        'rectangle':"url('../public/Images/rectangle1.svg')",
        'rectangle1':"url('../public/Images/rectangle2.svg')",
        'mobile':"url('../public/Images/iPhone.png')",
        'influencer':"url('../public/Images/iPhone_influencer.png')"
      },
      fontFamily:{
        'sans':'Raleway, sans-serif',
        'serif':'Noto Sans, sans-serif',
      },
      animation:{
        'slow':"spin 0.6s infinite linear"
      }
    }
  },
  plugins: [],
}