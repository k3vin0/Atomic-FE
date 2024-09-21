/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      textShadow: {
        sm: '1px 1px 2px rgba(0, 0, 0, 0.25)', // Small shadow
        DEFAULT: '2px 2px 4px rgba(0, 0, 0, 0.25)', // Default shadow
        lg: '3px 3px 6px rgba(0, 0, 0, 0.3)', // Large shadow
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-sm': {
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.25)',
        },
        '.text-shadow': {
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.25)',
        },
        '.text-shadow-lg': {
          textShadow: '3px 3px 6px rgba(0, 0, 0, 0.3)',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}

