const colors = require('tailwindcss/colors')

module.exports = {
    purge: {
        content: [
        './src/**/*.{html,ts}',
        ]
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                'dak-gray': '#f3f3f3',
                'dak-white': '#fcfcfc',
                'dak-main': '#3a3a3a',
                'dak-secondary': '#c2bfbf',
                'dak-warning': '#e5b5b5',
                'dak-success': '#dbe5b5',
            },
            maxHeight: {
                '0': '0',
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
                'full': '100%',
                '50vh': '50vh',
            },
        },
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
