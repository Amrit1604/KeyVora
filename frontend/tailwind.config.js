/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00ff41',      // Matrix green
        secondary: '#0ff',       // Cyan
        accent: '#ff006e',       // Hot pink
        background: '#0a0e27',   // Dark navy
        surface: '#1a1f3a',      // Lighter navy
        'text-primary': '#e0e0e0',    // Light gray
        'text-muted': '#8892b0',      // Muted gray
        success: '#00ff41',
        error: '#ff006e',
        warning: '#ffb800',
      },
      fontFamily: {
        heading: ['Orbitron', 'Space Mono', 'sans-serif'],
        body: ['Inter', 'Roboto', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'neon': '0 0 5px theme("colors.primary"), 0 0 20px theme("colors.primary")',
        'neon-pink': '0 0 5px theme("colors.accent"), 0 0 20px theme("colors.accent")',
        'neon-cyan': '0 0 5px theme("colors.secondary"), 0 0 20px theme("colors.secondary")',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          'from': {
            textShadow: '0 0 5px #00ff41, 0 0 10px #00ff41',
          },
          'to': {
            textShadow: '0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 30px #00ff41',
          },
        },
      },
    },
  },
  plugins: [],
}
