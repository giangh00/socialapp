const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT ({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components**/*.{html,js}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      roboto: ['Roboto', "sans-serif"],
    },
  },
  plugins: [],
});