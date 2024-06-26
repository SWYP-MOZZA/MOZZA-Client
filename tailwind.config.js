/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            fontFamily: {
                main: ['Spoqa Han Sans Neo'],
            },
            fontSize: {
                h1: '48px',
                subtitle1: '32px',
                subtitle2: '24px',
                subtitle3: '20px',
                sm_subtitle1: '16px',
                sm_subtitle2: '12px',
                sm_subtitle3: '10px',
                body1: '24px',
                body2: '20px',
                body3: '16px',
                sm_body1: '12px',
                sm_body2: '10px',
                sm_body3: '8px',
                emoji: '160px',
            },
            fontWeight: {
                normal: 400,
                medium: 500,
                bold: 700,
            },
            borderRadius: {
                resultBox: '24px',
                resultName: '16px',
            },
            lineHeight: {
                resultBox: '1.4', // 140%에 해당하는 값을 추가
            },
        },

        colors: {
            'green-100': '#CCF2E1',
            'green-300': '#66D19E',
            'green-500': '#00BC67',
            'green-600': '#009652',
            'green-700': '#00713E',

            white: '#FFFEFE',
            'gray-100': '#F5F5F5',
            'gray-300': '#E0E0E0',
            'gray-500': '#9E9E9E',
            'gray-800': '#424242',
            black: '#070707',

            'orange-100': '#FEEED2',
            'orange-200': '#FEDEA6',
            'yellow-400': '#FEE500',
        },
        screens: {
            sm: '100px',
            md: '768px',
        },
    },
    plugins: [],
};
