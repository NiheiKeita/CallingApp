<script setup lang="ts">
  useHead({
    title: 'たんこまゃん-ことちゃん',
    meta: [
      { property: 'og:title', content: 'たんこまゃん-ことちゃん' },
      {
        property: 'og:description',
        content: 'たんこまゃん-ことちゃんのページ',
      },
      { property: 'description', content: 'たんこまゃん-ことちゃんのページ' },
    ],
  });
</script>

<template>
  <div>
    <div class="m-2 mt-10 rounded-md bg-SubBgThemaColor p-2">
      <div class="flex w-full items-center justify-center">
        <img
          class="h-auto w-1/2"
          src="/images/characters/koto.png"
          alt="ことちゃん"
        />
      </div>
      <h1 class="mt-5 flex w-full items-center justify-center text-xl">
        ことちゃん
      </h1>
      <div class="mt-5 flex w-full items-center justify-center px-5">
        リボンが大好きなことちゃん。<br />
        夜は寝ないで動き回っている。
      </div>
    </div>
    <TextDefaultArea
      class="mt-4"
      text="スタンプ"
      image="/images/text/text_line_stamp.png"
    />
    <div class="flex w-full items-center justify-center">
      <div class="m-2 w-1/3">
        <nuxt-link :to="routePathList('stamp_koto')" target="_blank">
          <div class="w-full rounded-full bg-SubThemaColor">
            <img
              class="h-auto w-full rounded-full"
              src="/images/characters/koto.png"
              target="_blank"
              alt="ことちゃん"
            />
          </div>
          <div class="mt-2 flex items-center justify-center underline">
            ことちゃん
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
