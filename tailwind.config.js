const plugin = require('tailwindcss/plugin')


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    plugin(function({ addUtilities }) {
      addUtilities({
        '.content-auto': {
          'content-visibility': 'auto',
        },
        '.content-hidden': {
          'content-visibility': 'hidden',
        },
        '.content-visible': {
          'content-visibility': 'visible',
        },
      })
    })
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#04ff5f",
          "primary-focus": "#04FF60EA",
          "primary-content": "#020202",
          "secondary": "#04ff5f",
          "secondary-focus": "#04ff5f",
          "secondary-content": "#ffffff",
          "accent": "#37cdbe",
          "accent-focus": "#2aa79b",
          "accent-content": "#000000",
          "neutral": "#101216",
          "neutral-focus": "#090A0C",
          "neutral-content": "#ffffff",
          "base-100": "#0A0A0A",
          "base-200": "#111111",
          "base-300": "#d1d5db",
          "base-content": "#70CA9A",
          "info": "#e0f2fe",
          "info-content": "#2563eb",
          "success": "#dcfce7",
          "success-content": "#16a34a",
          "warning": "#fef3c7",
          "warning-content": "#d97706",
          "error": "#fee2e2",
          "error-content": "#dc2626",
        },
      },
      "cupcake",
    ],
  }
}
