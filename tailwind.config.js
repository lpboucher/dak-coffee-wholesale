module.exports = {
  purge: {
    content: [
      './src/**/*.{html,ts}',
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
        opacity: ['disabled'],
        cursor: ['disabled'],
    },
  },
  plugins: [
    require('@tailwindcss/custom-forms'),
  ],
}
