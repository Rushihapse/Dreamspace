/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#f6f1e8',
        dark: '#111111',
        charcoal: '#252525',
        gold: '#b48a5a',
        muted: '#7a746a',
        white: '#ffffff'
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        premium: '0 24px 70px rgba(17, 17, 17, 0.12)'
      }
    }
  },
  plugins: []
};
