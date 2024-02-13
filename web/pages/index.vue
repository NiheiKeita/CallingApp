<script setup></script>
<template>
  <div class="mx-auto max-w-4xl px-2 py-8">
    <h1 class="mb-6 text-3xl font-semibold text-gray-800">通話ルーム一覧</h1>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <!-- Room 1 -->
      <div
        class="flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-4"
      >
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-800">
            クッキングマスターへの道
          </h2>
          <p class="text-gray-600">
            料理について情熱を共有し、お互いに料理の技術を向上させることを目指します。レシピの共有や料理の失敗談、おすすめの調理器具について話しましょう！
          </p>
        </div>
        <div class="mt-4 flex items-center justify-between">
          <span class="text-sm text-gray-500">参加人数: 3</span>
          <nuxt-link
            :to="routePathList('call_screen')"
            class="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
          >
            参加する
          </nuxt-link>
        </div>
      </div>

      <!-- Room 2 -->
      <div
        class="flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-4"
      >
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-800">
            星空の夜に語ろう
          </h2>
          <p class="text-gray-600">
            宇宙や星に関する興味深い話題を共有しましょう。星座の解説、宇宙探査の最新情報、星にまつわる神話や伝説など、星空に関するあらゆる話題が歓迎です！
          </p>
        </div>
        <div class="mt-4 flex items-center justify-between">
          <span class="text-sm text-gray-500">参加人数: 2</span>
          <nuxt-link
            :to="routePathList('call_screen')"
            class="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
          >
            参加する
          </nuxt-link>
        </div>
      </div>

      <!-- Room 3 -->
      <div
        class="flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-4"
      >
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-800">
            フィットネスと健康の秘訣
          </h2>
          <p class="text-gray-600">
            健康的なライフスタイルやフィットネスに関するアドバイスを共有し合いましょう。栄養学の知識やエクササイズの効果的な方法、健康的な食事のアイデアなど、健康に関するあらゆる話題がここで議論されます！
          </p>
        </div>
        <div class="mt-4 flex items-center justify-between">
          <span class="text-sm text-gray-500">参加人数: 8</span>
          <nuxt-link
            :to="routePathList('call_screen')"
            class="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
          >
            参加する
          </nuxt-link>
        </div>
      </div>

      <!-- 他のルームをここに追加 -->
    </div>
  </div>
</template>
