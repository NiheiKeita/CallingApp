<script setup lang="ts">
  useHead({
    title: 'たんこまゃん-ねこちゃん',
    meta: [
      { property: 'og:title', content: 'たんこまゃん-ねこちゃん' },
      {
        property: 'og:description',
        content: 'たんこまゃん-ねこちゃんのページ',
      },
      { property: 'description', content: 'たんこまゃん-ねこちゃんのページ' },
    ],
  });
</script>

<template>
  <div>
    <div class="m-2 mt-10 rounded-md bg-SubBgThemaColor p-2">
      <div class="flex w-full items-center justify-center">
        <img
          class="h-auto w-1/2"
          src="/images/characters/neko-chan.png"
          alt="ねこちゃん"
        />
      </div>
      <h1 class="mt-5 flex w-full items-center justify-center text-xl">
        ねこちゃん
      </h1>
      <div class="mt-5 flex w-full items-center justify-center px-5">
        アンドウさんが寝ぼけて書いたねこちゃん。<br />
        朝ご飯を食べているときにコーラをこぼしたら絵から出てきて、今でも家の中をうろうろしている。
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
        :link="routePathList('shop_neko_chan_sticker')"
        image="/images/shop/neko_chan_sticker.jpg"
        alt="ねこちゃんステッカー"
      >
        ねこちゃん<br />
        ステッカー
      </GoodsDefaultArea>
      <GoodsDefaultArea
        class="w-1/3 p-2"
        :link="routePathList('shop_neko_chan_sweat')"
        image="/images/shop/neko_chan_sweat.jpg"
        alt="ねこちゃんスウェット"
      >
        ねこちゃん<br />
        スウェット
      </GoodsDefaultArea>
      <GoodsDefaultArea
        class="w-1/3 p-2"
        :link="routePathList('shop_neko_chan_cup')"
        image="/images/shop/neko_chan_cup.jpg"
        alt="ねこちゃんカップ"
      >
        ねこちゃん<br />
        カップ
      </GoodsDefaultArea>
    </div>
  </div>
</template>
