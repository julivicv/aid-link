/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts,tsx}","./src/*.{html,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
	require('daisyui'),
  ],
}

