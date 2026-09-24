/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'canvas-white': '#ffffff',
        'paper-mist': '#f5f5f5',
        'ash': '#e5e5e5',
        'smoke': '#d4d4d4',
        'pebble': '#c8c8c8',
        'midnight-ink': '#0a0a0a',
        'charcoal': '#171717',
        'graphite': '#262626',
        'slate-dub': '#404040',
        'steel': '#525252',
        'fog': '#737373',
        'silver': '#a3a3a3',
        'electric-blue': '#2563eb',
        'deep-sapphire': '#1e40af',
        'soft-mint': '#dcfce7',
        'vivid-green': '#16a34a',
        'tangerine': '#ea580c',
        'lavender': '#7c3aed',
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
        'input': '6px',
        'largecard': '16px',
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['Inter', '"Plus Jakarta Sans"', '-apple-system', 'sans-serif'],
        satoshi: ['Satoshi', 'Inter', 'sans-serif'],
        mono: ['"Geist Mono"', '"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'dub-subtle': 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
        'dub-sm': 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 4px -2px',
        'dub-ring': 'rgba(0, 0, 0, 0.1) 0px 0px 0px 4px',
        'handhold': '0 24px 64px -12px rgba(0, 0, 0, 0.08), 0 8px 24px -4px rgba(0, 0, 0, 0.04)',
        'card': '0 2px 12px -2px rgba(0, 0, 0, 0.04), 0 1px 3px 0 rgba(0, 0, 0, 0.02)',
      }
    },
  },
  plugins: [],
}
