/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        dark: "url('../public/images/bg-dark.png')",
        light: "url('../public/images/bg-light.png')",
        cloud: "url('../public/images/cloud.png')",
        sun: "url('../public/images/sun.png')",
      },
    },
    screens: {
      mobile: { max: "650px" },
    },
  },
  variants: {},
  plugins: [],
};
