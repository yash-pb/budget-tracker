/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    './src/**/*.{html,js,jsx,ts,tsx,vue}',  // Adjust according to your project structure
    './public/**/*.html',
    './components/**/*.{html,js,jsx,ts,tsx}', // If you have a components directory
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light", "dark",
      {
        custom: {
          "primary": "#3c2bff",
          "primary-content": "#d0dcff",
          "secondary": "#ae9a00",
          "secondary-content": "#0b0900",
          "accent": "#0097e6",
          "accent-content": "#000813",
          "neutral": "#271a27",
          "neutral-content": "#cfcccf",
          "base-100": "#fcfffa",
          "base-200": "#dbded9",
          "base-300": "#bbbeba",
          "base-content": "#161615",
          "info": "#00a8ff",
          "info-content": "#000a16",
          "success": "#80ab00",
          "success-content": "#060b00",
          "warning": "#ffc200",
          "warning-content": "#160e00",
          "error": "#e6000c",
          "error-content": "#ffd8d2",
        },
      },
    ],
  },
}

