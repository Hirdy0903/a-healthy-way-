/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },

      boxShadow: {
        'card':    '0 2px 8px rgba(15,23,42,0.06)',
        'card-md': '0 4px 16px rgba(15,23,42,0.08)',
        'card-lg': '0 8px 32px rgba(15,23,42,0.12)',
      },
      borderRadius: {
        'theme': '12px', 'theme-lg': '16px', 'theme-xl': '24px',
      },
      animation: {
        'slide-in':   'slideIn 0.3s ease-out',
        'fade-in':    'fadeIn 0.3s ease-out',
        'fade-in-up': 'fadeInUp 0.4s ease-out',
        'breathe':    'breathe 8s ease-in-out infinite',
      },
      keyframes: {
        slideIn:  { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(0)' } },
        fadeIn:   { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        fadeInUp: { '0%': { opacity: '0', transform: 'translateY(10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        breathe:  { '0%, 100%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.3)' } },
      },
    },
  },
  plugins: [],
};
