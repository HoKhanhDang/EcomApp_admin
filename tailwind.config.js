/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['src/**/*.{js,jsx,ts,tsx}', 'public/index.html'],
    theme: {
        fontFamily: {
            main: ['Poppins']
        },
        extend: {
            colors: {
                'main-bg': '#E5E7EB',
                'chart-1': '#FFC700',
                'chart-2': '#FF3D00',
                'chart-3': '#FFAA00',
                'chart-4': '#FF3D00',
                'chart-5': '#FFAA00',
                'login-main': '#41415D',
                'login-nav': '#454563'
            }
        }
    },
    plugins: []
}
