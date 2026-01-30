/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'rdr-red': '#8a0303',
        'rdr-paper': '#e3dac9',
        'rdr-black': '#1a1a1a',
        'rdr-brown': '#4a3728',
        'rdr-gray': '#2f2f2f',
        'rdr-ink': '#0f0f0f',
      },
      fontFamily: {
        rye: ['Rye', 'serif'],
        typewriter: ['Courier Prime', 'monospace'],
        serif: ['Crimson Text', 'serif'],
      },
      backgroundImage: {
        'paper-texture': "url('https://www.transparenttextures.com/patterns/aged-paper.png')",
        'grunge-overlay': "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.2))",
      },
    },
  },
  plugins: [],
}
