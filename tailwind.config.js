/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    // These options are passed through directly to PurgeCSS
    options: {
      // List your classes here, or you can even use RegExp
      safelist: ['bg-gray-500', 'bg-blue-500', 'bg-gray-700', 'bg-blue-700',],
    },
  },
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
