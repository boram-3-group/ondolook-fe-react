/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      fontSize: {
        Display: ['24px', { lineHeight: '150%', fontWeight: '700', letterSpacing: '0' }],
        Header: ['22px', { lineHeight: '150%', fontWeight: '700', letterSpacing: '0' }],
        Title1: ['20px', { lineHeight: '150%', fontWeight: '700', letterSpacing: '0' }],
        Title2: ['18px', { lineHeight: '150%', fontWeight: '600', letterSpacing: '0' }],
        Title3: ['18px', { lineHeight: '150%', fontWeight: '500', letterSpacing: '0' }],
        Body1: ['16px', { lineHeight: '150%', fontWeight: '500', letterSpacing: '0' }],
        Body2: ['14px', { lineHeight: '150%', fontWeight: '500', letterSpacing: '0' }],
        Body3: ['14px', { lineHeight: '150%', fontWeight: '700', letterSpacing: '0' }],
        Body4: ['13px', { lineHeight: '150%', fontWeight: '400', letterSpacing: '0' }],
        Detail: ['12px', { lineHeight: '150%', fontWeight: '400', letterSpacing: '0' }],
        LabelLg: ['16px', { lineHeight: '150%', fontWeight: '500', letterSpacing: '0' }],
        LabelSm: ['14px', { lineHeight: '150%', fontWeight: '500', letterSpacing: '0' }],
        LabelLink: ['12px', { lineHeight: '150%', fontWeight: '400', letterSpacing: '0' }],
      },

      fontFamily: {
        pretendard: ['"Pretendard Variable"', 'sans-serif'],
      },

      colors: {
        grayScale: {
          0: '#FFFFFF',
          5: '#F8F8F8',
          10: '#F0F0F0',
          20: '#E4E4E4',
          30: '#D8D8D8',
          40: '#C6C6C6',
          50: '#8E8E8E',
          60: '#717171',
          70: '#555555',
          80: '#2D2D2D',
          90: '#1D1D1D',
          100: '#000000',
        },
        white: '#FFFFFF',
        primary: {
          5: '#EBF5FF',
          10: '#C7E3FF',
          20: '#8FC8FF',
          30: '#56ACFF',
          40: '#1E90FF',
          50: '#0074E5',
          60: '#0056AA',
          70: '#00407F',
          80: '#002B55',
          90: '#00152A',
        },
        point: {
          5: '#FFFBE5',
          10: '#FFF6CC',
          20: '#FFEE99',
          30: '#FFE566',
          40: '#FFDD33',
          50: '##FFD400',
        },
        danger: {
          5: '#FEECF0',
          10: '#FCD4DE',
          50: '#EB003B',
          60: '#D50136',
        },
        success: {
          5: '#EBF5FF',
          10: '#C7E3FF',
          50: '#0074E5',
          60: '#0056AA',
        },
        fontFamily: {
          sans: ['"Pretendard Variable"', 'sans-serif'],
        },
      },
    },
  },

  plugins: [],
};
