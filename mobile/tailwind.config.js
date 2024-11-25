/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './App.tsx',
        './src/**/*.{js,jsx,ts,tsx}',
        './node_modules/tailwind-rn/**/*.js',
    ],
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            colors: {
                primary: '#463f3a',
                secondary: '#8a817c',
                tertiary: '#bcb8b1',
                quaternary: '#f4f3ee',
                quinary: '#e0afa0',
            },
            fontFamily: {
                thin: ['Poppins-Thin', 'sans-serif'],
                extralight: ['Poppins-ExtraLight', 'sans-serif'],
                light: ['Poppins-Light', 'sans-serif'],
                regular: ['Poppins-Regular', 'sans-serif'],
                medium: ['Poppins-Medium', 'sans-serif'],
                semibold: ['Poppins-SemiBold', 'sans-serif'],
                bold: ['Poppins-Bold', 'sans-serif'],
                extrabold: ['Poppins-ExtraBold', 'sans-serif'],
                black: ['Poppins-Black', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
