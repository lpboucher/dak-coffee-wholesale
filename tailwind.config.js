const colors = require('tailwindcss/colors')

module.exports = {
    purge: {
        content: [
        './src/**/*.{html,ts}',
        ]
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        /*colors: {
            transparent: 'transparent',
            current: 'currentColor',
            gray: colors.coolGray,
            red: colors.red,
            blue: colors.sky,
            green: colors.green,
            yellow: colors.amber,
            indigo: colors.indigo,
            white: colors.white,
            black: colors.black
        },*/
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
