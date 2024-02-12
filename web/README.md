## tailwind cssを適応

参考 https://tailwindcss.com/docs/guides/nuxtjs#3
https://qiita.com/airRnot1106/items/0be37ee7863825267bb1

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

> > nuxt.config.js

```bash
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  devtools: { enabled: true }
})
```

> > tailwind.config.js

```bash
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

> > assets\css\main.css を作成

```bash
@tailwind base;
@tailwind components;
@tailwind utilities;
```

起動
npm run dev

## input 使い方

<InputDefaultArea
v-model="｛｛初期の値｝｝"
display="名前"
name="name"
@change-emit="｛｛inputが変更されたときに呼び出してほしい関数｝｝"
/>

## text size

text-sm
text-base
text-lg

## 参考

https://qlitre-weblog.com/django-nuxt3-blog
