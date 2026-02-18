/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                shinesweep: {
                    '0%': { transform: 'translateX(-100%)' },
                    '20%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(100%)' },
                },
            },
            animation: {
                shinesweep: 'shinesweep 1.5s ease-in-out infinite',
            },
        },
    },
    plugins: [],
}
