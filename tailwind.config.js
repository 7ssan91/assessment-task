/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1140px',
      '2xl': '1280px',
      '3xl': '1536px',
    },
    colors: {
      black: {
        '000': '#000',
        100: '#070707',
        200: '#212529',
        300: '#343a40',
        400: '#3a3a3a',
        600: '#333',
        700: '#292929',
        900: '#001115',
      },
      navy: {
        75: '#f2f7f9',
        100: '#EBFBFF',
        200: '#CDE2E9',
        300: '#a6e8f7',
        350: '#589BAD',
        400: '#007c90',
        450: '#0C697E',
        500: '#006782',
        550: '#0b586d',
        575: '#00596c',
        600: '#085671',
        700: '#1B4759',
      },
      gray: {
        15: '#a3a3a3',
        25: '#fafafa',
        50: '#f7f7f7',
        75: '#f8f8f8',
        100: '#f4f5f7',
        150: '#f2f7f8',
        175: '#faf9f8',
        200: '#fdf8f6',
        250: '#e5eaec',
        275: '#dddddd',
        300: '#d8d8d8',
        310: '#dee2e6',
        350: '#969696',
        370: '#d0d0d0',
        325: '#dee2e6',
        375: '#c1c1c1',
        400: '#c3beb6',
        450: '#898989',
        475: '#cccccc',
        500: '#d4d4d4',
        600: '#9e9e9e',
        650: '#707070',
        700: '#999999',
        750: '#797979',
        800: '#616161',
        850: '#b0b0b0',
        900: '#3a3a3a',
      },
      brand: {
        100: '#6c7fd8',
        400: '#D5D2C5',
      },
      blue: {
        50: '#f7fdff',
        200: '#e6f0f3',
        400: '#7AA6BB',
        600: '#0f92f3',
        700: '#006782',
        900: '#0c2848c2',
      },
      emerald: {
        400: '#038A96',
      },
      error: {
        150: '#fdf2ee',
        200: '#FFF7F8',
        300: '#f8d7da',
        400: '#FF8686',
        700: '#fe3d5e',
        725: '#DB4437',
        750: '#c9501c',
        800: '#de3618',
      },
      success: {
        200: '#F5FAF5',
        400: '#A3C362',
        700: '#84c502',
      },
      warning: {
        200: '#FDEED3',
        700: '#f4aa24',
      },
      currentColor: 'currentColor',
      white: '#fff',
      transparent: 'transparent',
    },
    extend: {
      fontSize: {
        '2xs': ['0.5rem', { lineHeight: '0.75rem' }],
        xs: ['0.625rem', { lineHeight: '0.875rem' }],
        sm: ['0.75rem', { lineHeight: '1.15rem' }],
        md: ['0.875rem', { lineHeight: '1.25rem' }],
        '2.5xl': ['1.75rem', { lineHeight: '2.125rem' }],
        '4.5xl': ['2.5rem', { lineHeight: '3rem' }],
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '100',
          },
        },
      },
      animation: {
        'spin-slow': 'spin 10s linear infinite',
        fadeIn: 'fadeIn 200ms ease-in',
      },
      fontFamily: {
        english: [""],
        arabic: ["cursive"],
      },
      spacing: {
        '1.25': '0.3125rem',
        '4.5': '1.125rem',
        '6.5': '1.625rem',
        '15': '3.75rem',
        '16.5': '4.125rem',
        '17': '4.25rem',
        '17.5': '4.375rem',
        '18': '4.5rem',
        '18.5': '4.625rem',
        '19': '4.75rem',
        '26': '6.5rem',
        '2px': '2px',
        '3px': '3px',
        '4px': '4px',
        '5px': '5px',
        '6px': '6px',
        '7px': '7px',
        '8px': '8px',
        '9px': '9px',
        '10px': '10px',
        '11px': '11px',
        '12px': '12px',
        '13px': '13px',
        '14px': '14px',
        '15px': '15px',
        '16px': '16px',
        '17px': '17px',
        '18px': '18px',
        '19px': '19px',
        '20px': '20px',
        '21px': '21px',
        '22px': '22px',
        '23px': '23px',
        '24px': '24px',
        '25px': '25px',
        '26px': '26px',
        '27px': '27px',
        '28px': '28px',
        '29px': '29px',
        '30px': '30px',
        '31px': '31px',
        '32px': '32px',
        '33px': '33px',
        '34px': '34px',
        '35px': '35px',
        '36px': '36px',
        '37px': '37px',
        '38px': '38px',
        '39px': '39px',
        '40px': '40px',
        '41px': '41px',
        '42px': '42px',
        '43px': '43px',
        '44px': '44px',
        '45px': '45px',
        '46px': '46px',
        '47px': '47px',
        '48px': '48px',
        '49px': '49px',
        '50px': '50px',
        '600px': '600px',
        '750px': '750px',
        '70vh': '70vh',
        '92': '23rem',
        '94': '23.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        down: '0px 12px 32px rgba(50, 50, 50, 0.15)',
        up: '0px -8px 32px rgba(50, 50, 50, 0.1)',
        table: '0 0 9px #0000001a',
        stickyfooter: '0px 2px 16px rgba(0, 0, 0, 0.16)',
        flwBtn: '0px 2px 10px rgba(0, 0, 0, 0.15)',
      },
      zIndex: {
        100: '100',
        200: '200',
        300: '300',
        400: '400',
        500: '500',
        600: '600',
        700: '700',
        800: '800',
        900: '900',
        1000: '1000',
      },
      borderWidth: {
        '0.5': '0.5px',
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundSize: {
        '50%': '50%',
        '100%': '100%',
        '110%': '110%',
      },
      lineHeight: {
        'extra-loose': '2.5',
      },
      aspectRatio: {
        '2/1': '2 / 1',
        '1/2': '1 / 2',
        '9/4': '9 / 4',
      },
    },
  },
  corePlugins: {},
  plugins: [],
};