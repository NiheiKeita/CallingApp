<script setup lang="ts">
  useHead({
    title: 'たんこまゃん-アンドウさん',
    meta: [
      { property: 'og:title', content: 'たんこまゃん-アンドウさん' },
      {
        property: 'og:description',
        content: 'たんこまゃん-アンドウさんのページ',
      },
      { property: 'description', content: 'たんこまゃん-アンドウさんのページ' },
    ],
  });
</script>

<template>
  <div>
    <div class="m-2 mt-10 rounded-md bg-SubBgThemaColor p-2">
      <div class="flex w-full items-center justify-center">
        <img
          class="h-auto w-1/2"
          src="/images/characters/ando.png"
          alt="アンドウさん"
        />
      </div>
      <h1 class="mt-5 flex w-full items-center justify-center text-xl">
        アンドウさん
      </h1>
      <div class="mt-5 flex w-full items-center justify-center px-5">
        正体不明の謎の生物。<br />
        悪いことをしたり片思いの相手と話したりすると、すぐに顔にでる。そのため隠し事もできない。<br />
        ピーマンが嫌い。
      </div>
    </div>
    <TextDefaultArea
      class="mt-4"
      text="スタンプ"
      image="/images/text/text_line_stamp.png"
    />
    <div class="flex w-full items-center justify-center">
      <div class="m-2 w-1/3">
        <nuxt-link :to="routePathList('stamp_ando')" target="_blank">
          <div class="w-full rounded-full bg-SubThemaColor">
            <img
              class="h-auto w-full rounded-full"
              src="/images/characters/ando.png"
              target="_blank"
              alt="アンドウさん１"
            />
          </div>
          <div class="mt-2 flex items-center justify-center underline">
            アンドウさん１
          </div>
        </nuxt-link>
      </div>
    </div>
    <TextDefaultArea
      class="mt-4"
      text="グッズ"
      image="/images/text/text_goods.png"
    />
    <div class="flex w-full flex-wrap items-baseline justify-center">
      <GoodsDefaultArea
        class="w-1/3 p-2"
        :link="routePathList('shop_ando_smartphone_case')"
        image="/images/shop/ando_smartphone_case.jpg"
        alt="アンドウさんスマホケース"
      >
        アンドウさん<br />
        スマホケース
      </GoodsDefaultArea>
      <GoodsDefaultArea
        class="w-1/3 p-2"
        :link="routePathList('shop_ando_t-shirt')"
        image="/images/shop/ando_t-shirt.jpg"
        alt="アンドウさんTシャツ"
      >
        アンドウさん<br />
        Tシャツ
      </GoodsDefaultArea>
      <GoodsDefaultArea
        class="w-1/3 p-2"
        :link="routePathList('shop_ando_cup')"
        image="/images/shop/ando_cup.jpg"
        alt="アンドウさんカップ"
      >
        アンドウさん<br />
        カップ
      </GoodsDefaultArea>
    </div>
  </div>
</template>
