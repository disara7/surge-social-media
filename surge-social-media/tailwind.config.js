const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: [],
  theme: {
    extend: {
      colors: {
        primary: '#406ff3',
        text: '#6a778e',
        background: '#eaeef6',
      },
      spacing: {
        spacer: '1rem',
        linkHeight: 'calc(1rem * 3.5)',
      },
      borderRadius: {
        custom: '10px',
        large: '17.5px',
      },
      boxShadow: {
        subtle: '0 0 40px rgba(0,0,0,0.03)',
      },
      animation: {
        gooey: 'gooeyEffect 250ms ease-in-out',
      },
      keyframes: {
        gooeyEffect: {
          '0%': { transform: 'scale(1, 1)' },
          '50%': { transform: 'scale(0.5, 1.5)' },
          '100%': { transform: 'scale(1, 1)' },
        },
      },
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    }
  },
  plugins: [],
});