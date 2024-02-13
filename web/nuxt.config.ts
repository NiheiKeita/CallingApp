// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  ssr: false,
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    // baseURL: '/nuxt3-skyway/',
    head: {
      title: 'たんこまゃん',
      meta: [
        { hid: 'og:image', property: 'og:image', content: '/images/logo.png' },
      ],
      link: [{ rel: 'icon', href: '/favicon.ico' }],
    },
  },
  devtools: { enabled: true },
  // modules: ['@nuxtjs/storybook'],
  runtimeConfig: {
    public: {
      APP_ID: process.env.APP_ID,
      SECRET_ID: process.env.SECRET_ID,
    },
  },
});
