/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'basket': "url('https://imageproxy.wolt.com/menu/menu-images/63b2eb5a48d2561443111895/4ef66b04-cd7a-11ed-8f6e-a2a0670a71cf___________________.jpeg?w=600')",
        'catering': "url('https://imageproxy.wolt.com/menu/menu-images/shared/cf8a7080-3ab2-11ee-8d78-16e2ec9ba674_artboard_1_____.png?w=600')",
        'morning': "url('https://imageproxy.wolt.com/menu/menu-images/5fb2938e8c43925713bd66aa/a609f594-baf9-11ec-ac27-dea994b56f5e_____11252_optimized_1000x666.jpeg?w=600')",
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}