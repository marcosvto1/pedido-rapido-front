module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#06FF00",
          "primary-focus": "#06CE03",
          "primary-content": "#020202",
          "secondary": "#f6d860",
          "secondary-focus": "#f3cc30",
          "secondary-content": "#ffffff",
          "accent": "#37cdbe",
          "accent-focus": "#2aa79b",
          "accent-content": "#000000",
          "neutral": "#3d4451",
          "neutral-focus": "#2a2e37",
          "neutral-content": "#ffffff",
          "base-100": "#1111",
          "base-200": "#f9fafb",
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
