<template>
  <div class="sticky top-0 flex w-full justify-between bg-ThemaColor">
    <nuxt-link :to="routePathList('top')" class="">
      <div class="flex justify-center">
        <img class="ml-2 h-14" src="@/assets/images/logo.png" />
        <!-- <p
          class="flex items-center justify-center text-2xl font-bold leading-3 text-white"
        >
          たんこまゃん
        </p> -->
      </div>
    </nuxt-link>
    <div class="flex items-center justify-center">
      <HambergerMenu />
    </div>
  </div>
</template>
