<script setup lang="ts">
  useHead({
    title: 'たんこまゃん-パプリカくん',
    meta: [
      { property: 'og:title', content: 'たんこまゃん-パプリカくん' },
      {
        property: 'og:description',
        content: 'たんこまゃん-パプリカくんのページ',
      },
      { property: 'description', content: 'たんこまゃん-パプリカくんのページ' },
    ],
  });
</script>

<template>
  <div>
    <div class="m-2 mt-10 rounded-md bg-SubBgThemaColor p-2">
      <div class="flex w-full items-center justify-center">
        <img
          class="h-auto w-1/2"
          src="/images/characters/paprika.png"
          alt="パプリカくん"
        />
      </div>
      <h1 class="mt-5 flex w-full items-center justify-center text-xl">
        パプリカくん
      </h1>
      <div class="mt-5 flex w-full items-center justify-center px-5">
        ピーマンが嫌いなアンドウさんが、カレーの中に丸ごと入れられたピーマンをゴミ箱に捨てたら怒って化けてでてきた。<br />
        夜な夜なアンドウさんの口の中に入って食べられようとしている。
      </div>
    </div>
    <TextDefaultArea
      class="mt-4"
      text="スタンプ"
      image="/images/text/text_line_stamp.png"
    />
    <div class="flex w-full items-center justify-center">
      <div class="m-2 w-1/3">
        <nuxt-link :to="routePathList('stamp_paprika')" target="_blank">
          <div class="w-full rounded-full bg-SubThemaColor">
            <img
              class="h-auto w-full rounded-full"
              src="/images/characters/paprika.png"
              target="_blank"
              alt="パプリカくん"
            />
          </div>
          <div class="mt-2 flex items-center justify-center underline">
            パプリカくん
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
