/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#061B31',
          900: '#0A2540',
          800: '#1A365D',
          700: '#2A4365',
        },
        slate: {
          900: '#1C2E46',
          700: '#425466',
          500: '#64748D',
          400: '#8898AA',
          200: '#E6ECF1',
          100: '#F0F4F8',
          50: '#F8FAFC',
        },
        brand: {
          indigo: '#635BFF',
          violet: '#533AFD',
          teal: '#00D4B2',
          emerald: '#10B981',
          cyan: '#0070F3',
          crimson: '#DF1B41',
          amber: '#F59E0B',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'stripe': 'rgba(50, 50, 93, 0.12) 0px 15px 35px -5px, rgba(0, 0, 0, 0.05) 0px 5px 15px 0px',
        'stripe-hover': 'rgba(50, 50, 93, 0.18) 0px 30px 60px -12px, rgba(0, 0, 0, 0.08) 0px 18px 36px -18px',
        'stripe-card': '0 2px 5px -1px rgba(50, 50, 93, 0.08), 0 1px 3px -1px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
