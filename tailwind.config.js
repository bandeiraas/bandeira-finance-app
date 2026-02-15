/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0ea5e9', // Sky 500 (Accent Blue)
          foreground: '#ffffff',
        },
        slate: {
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        success: '#10b981', // Emerald
        danger: '#f43f5e', // Rose
        warning: '#f59e0b', // Amber
        background: '#0f172a', // Slate 900
        surface: '#1e293b', // Slate 800
        border: '#334155', // Slate 700
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      borderRadius: {
        lg: '12px',
        xl: '20px',
        '2xl': '28px',
        '3xl': '36px',
      },
    },
  },
  plugins: [],
}
