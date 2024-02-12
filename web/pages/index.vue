<script setup lang="ts">
  import { Autoplay, Navigation, Pagination } from 'swiper';
  import 'swiper/css';
  // import 'swiper/css/navigation';
  import 'swiper/css/pagination';
  import { Swiper, SwiperSlide } from 'swiper/vue';

  const modules = [Autoplay, Pagination, Navigation];

  const linkToOtherWindow = (url: string) => {
    window.open(url, '_blank');
  };
  useHead({
    title: 'たんこまゃん-TOP',
    meta: [
      { property: 'og:title', content: 'たんこまゃん-TOP' },
      {
        property: 'og:description',
        content:
          'たんこまゃん-たんこまゃんのTOPページです。たんこまゃんの仲間たちがたくさんいる。LINEスタンプやグッズもあります。',
      },
      {
        property: 'description',
        content:
          'たんこまゃん-たんこまゃんのTOPページです。たんこまゃんの仲間たちがたくさんいる。LINEスタンプやグッズもあります。',
      },
    ],
  });
</script>

<template>
  <div>
    <div class="relative m-2 mt-4 rounded-md bg-SubBgThemaColor p-2">
      <Swiper
        :slides-per-view="1.5"
        :speed="1000"
        :loop="true"
        :autoplay="{ delay: 3000 }"
        :modules="modules"
        :centered-slides="true"
        :space-between="30"
        :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }"
        :pagination="true"
      >
        <SwiperSlide>
          <nuxt-link
            :to="routePathList('stamp_ando')"
            target="_blank"
            class="flex items-center justify-center"
          >
            <img class="h-auto w-full" src="/images/notice/notice_1.jpeg" />
          </nuxt-link>
        </SwiperSlide>
        <SwiperSlide>
          <nuxt-link
            :to="routePathList('stamp_ando')"
            target="_blank"
            class="flex items-center justify-center"
          >
            <img class="h-auto w-full" src="/images/notice/notice_1.jpeg" />
          </nuxt-link>
        </SwiperSlide>
      </Swiper>
      <div
        class="swiper-button-prev absolute inset-y-1/2 left-0 z-10 ms-4 flex cursor-pointer items-center justify-center"
      >
        <img
          class="h-8 w-8 lg:h-20 lg:w-20"
          src="/images/items/left_arrow.svg"
        />
      </div>
      <div
        class="swiper-button-next absolute inset-y-1/2 right-0 z-10 me-4 flex cursor-pointer items-center justify-center"
      >
        <img
          class="h-8 w-8 lg:h-20 lg:w-20"
          src="/images/items/right_arrow.svg"
        />
      </div>
    </div>

    <TextDefaultArea
      class="mt-4"
      text="キャラクター"
      image="/images/text/text_character.png"
    />
    <div class="m-2 rounded-md bg-SubBgThemaColor p-2">
      <div class="flex w-full flex-wrap items-baseline justify-center">
        <CharacterDefaultArea
          class="w-1/3 p-2"
          :link="routePathList('character_ando')"
          image="/images/characters/ando.png"
          alt="アンドウさん"
          >アンドウさん
        </CharacterDefaultArea>
        <CharacterDefaultArea
          class="w-1/3 p-2"
          :link="routePathList('character_neko_chan')"
          image="/images/characters/neko-chan.png"
          alt="ねこちゃん"
          >ねこちゃん
        </CharacterDefaultArea>
        <CharacterDefaultArea
          class="w-1/3 p-2"
          :link="routePathList('character_paprika')"
          image="/images/characters/paprika.png"
          alt="パプリカくん"
          >パプリカくん
        </CharacterDefaultArea>
        <CharacterDefaultArea
          class="w-1/3 p-2"
          :link="routePathList('character_koto')"
          image="/images/characters/koto.png"
          alt="ことちゃん"
          >ことちゃん
        </CharacterDefaultArea>
      </div>
      <!-- <ButtonDefaultThema
        class="mb-3 mt-5 flex w-full items-center justify-center"
        msg="キャラクター一覧へ"
        @click="navigateTo({ path: routePathList('character_list') })"
      /> -->
      <ButtonDefaultThema
        class="mb-3 mt-5 flex w-full items-center justify-center"
        @click="linkToOtherWindow(routePathList('stamp_ando'))"
        ><img
          class="mx-1 h-6"
          src="@/assets/images/icon_LINE.png"
        />LINEスタンプ</ButtonDefaultThema
      >
    </div>
    <!-- <div class="my-2 h-[1px] w-full bg-SubThemaColor"></div>
    <div>
      <div class="flex h-5 w-full items-center justify-center">ニュース</div>
      <div class="m-2 rounded-md bg-SubBgThemaColor p-2">
        <div class="w-full">
          <InformationDefaultArea />
        </div>
        <nuxt-link :to="routePathList('information_list')" class="">
          <div
            class="mb-3 mt-5 flex w-full items-center justify-center underline"
          >
            もっとみる
          </div>
        </nuxt-link>
      </div>
    </div>
    <div class="my-2 h-[1px] w-full bg-SubThemaColor"></div> -->

    <TextDefaultArea
      class="mt-4"
      text="グッズ"
      image="/images/text/text_goods.png"
    />
    <div class="m-2 rounded-md bg-SubBgThemaColor p-2">
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
      <nuxt-link :to="routePathList('sns_suzuri')" target="_blank">
        <div
          class="mb-3 mt-5 flex w-full items-center justify-center underline"
        >
          もっとみる
        </div>
      </nuxt-link>
      <ButtonDefaultThema
        class="mb-3 mt-5 flex w-full items-center justify-center"
        @click="linkToOtherWindow(routePathList('sns_suzuri'))"
      >
        <img
          class="mx-1 h-6"
          src="@/assets/images/icon_suzuri.png"
        />Suzuriへ</ButtonDefaultThema
      >
    </div>
  </div>
</template>
