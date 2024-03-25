/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7C5EFB",
        secondary: "#9278FE",
        tertiary: "#363B55",
        success: "#1EE5A3",
        fail: "#FF9100",
        alert: "#E55C5C",
        dark: "#141625",
      },
      fontFamily: {
        sans: ["Lato", "sans"],
        arab: ["Cairo", "sans"],
      },
    },
  },
};
/* 
    
    


#1E213C
#1F2C3F
#2B2733

*/
