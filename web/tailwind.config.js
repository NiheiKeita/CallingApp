/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
    './stories/**/*.{js,vue,ts}',
  ],
  theme: {
    extend: {
      colors: {
        ThemaColor: '#e8bab2',
        MainColor: '#F9EDEB',
        SubThemaColor: '#B0C9E5',
        SubBgThemaColor: '#fefcfb',
        TexasRose: '#ffad5b',
        ThemaColorComplementary: '#5badff',
        ThemaColorInversion: '#0052a4',
        ThemaColorHover: '#ffcea0',
        BoardBG: '#006633',
        BoardBorder: '#b2771f',
      },
      fontFamily: {
        body: [
          'Hiragino Sans',
          'ヒラギノ角ゴシック',
          'メイリオ',
          'Meiryo',
          'MS Ｐゴシック',
          'MS PGothic',
          'sans-serif',
          'YuGothic',
          'Yu Gothic',
        ],
      },
    },
  },
  plugins: [],
};
