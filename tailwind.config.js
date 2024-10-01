/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        lightTheme: {
          primary: '#8CBA51', // Verde brillante como color principal
          secondary: '#424242', // Gris oscuro para detalles secundarios
          accent: '#779b33', // Mismo verde para acento
          neutral: '#424242', // Fondo claro
          'base-100': '#EDEDED', // Fondo principal blanco
          info: '#48CFCB', // Turquesa claro para información
          success: '#779b33', // Verde para éxito
          warning: '#FBBF24', // Amarillo suave para advertencias
          error: '#EF4444', // Rojo para errores
        },
      },
      {
        darkTheme: {
          primary: '#8CBA51', // Verde brillante, se mantiene como color principal
          secondary: '#F5F5F5', // Blanco o gris muy claro para detalles secundarios
          accent: '#DEFF8B', // Mismo verde brillante
          neutral: '#1c1c1c', // Fondo oscuro
          'base-100': '#121212', // Fondo principal negro suave
          info: '#48CFCB', // Turquesa claro para información
          success: '#779b33', // Verde para éxito
          warning: '#FBBF24', // Amarillo oscuro
          error: '#EF4444', // Rojo para errores
        },
      },
    ],
  },
  plugins: [
    require('daisyui'),
    function ({ addUtilities }) {
      const shadows = {
        '.text-shadow-sm': {
          textShadow: '1px 1px 2px rgba(156,153,156,1)',
        },
        '.text-shadow': {
          textShadow: '2px 2px 4px rgba(156,153,156,1)',
        },
        '.text-shadow-lg': {
          textShadow: '3px 3px 5px rgba(156,153,156,1)',
        },
      };
      addUtilities(shadows, ['responsive', 'hover']);
    },
  ],
};
