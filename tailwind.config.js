/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'scroll-indicator': 'scroll 2s infinite 2s',
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
      },
      keyframes: {
        scroll: {
          '0%': { opacity: '1', height: '8px' },
          '20%': { opacity: '1', height: '8px' },
          '30%': { transform: 'translateY(0)', opacity: '1', height: '19px' },
          '40%': { opacity: '1' },
          '80%': { transform: 'translateY(19px)', opacity: '0', height: '0' },
          '81%': { transform: 'translateY(0)', opacity: '0', height: '8px' },
          '100%': { opacity: '1', height: '8px' }
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}