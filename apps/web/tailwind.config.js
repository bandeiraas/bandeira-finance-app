/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/shared/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0ea5e9', // Sky 500 (Accent Blue)
          foreground: '#ffffff',
        },
        'brand-itau': '#ec7000',
        'brand-itau-light': '#fff0e0',
        'brand-itau-dark': '#b35500',
        bank: {
          nubank: '#820ad1',
          itau: '#ec7000',
          bradesco: '#cc092f',
          santander: '#ec0000',
          bb: '#ffc629',
          inter: '#ff7a00',
          c6: '#6366f1',
          caixa: '#0066b3',
          default: '#0ea5e9',
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
        'navy-dark': '#0f172a',
        'accent-blue': '#0ea5e9',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      borderRadius: {
        lg: '12px',
        xl: '20px',
        '2xl': '28px',
        '3xl': '36px',
      },
      backgroundImage: {
        'navy-gradient': 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(-50%)' },
          '50%': { transform: 'translateY(-5px) translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
