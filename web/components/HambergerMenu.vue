<script setup lang="ts">
  const showMenu = ref(false);
  const toggleStatus = () => {
    showMenu.value = !showMenu.value;
  };
  const toggleClose = () => {
    showMenu.value = false;
  };
</script>

<template>
  <div class="">
    <div class="mx-auto flex h-10 w-full items-center justify-between px-6">
      <div class="text-white">
        <button
          v-show="!showMenu"
          class="focus:outline-none"
          @click="toggleStatus"
        >
          <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
            <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" />
          </svg>
        </button>
      </div>
    </div>
    <transition name="slide-fade" mode="out-in">
      <div v-show="showMenu" class="fixed right-0 top-0 h-full w-1/2 lg:w-1/4">
        <ul class="relative z-20 h-full bg-ThemaColor">
          <li class="flex h-10 items-center justify-end px-6 pt-3">
            <div class="flex items-center justify-end text-white">
              <button
                v-show="showMenu"
                class="focus:outline-none"
                @click="toggleStatus"
              >
                <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
                  <path
                    d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
                  />
                </svg>
              </button>
            </div>
          </li>
          <li class="mt-2">
            <nuxt-link
              :to="routePathList('stamp_ando')"
              target="_blank"
              class="inline-block w-full p-5 text-white sm:hover:bg-gray-600"
              @click="toggleClose"
            >
              <div class="flex items-center">
                <img class="h-6" src="@/assets/images/icon_LINE.png" />
                <div class="ml-2 text-lg">スタンプ</div>
              </div>
            </nuxt-link>
          </li>
          <li class="">
            <nuxt-link
              :to="routePathList('top')"
              class="inline-block w-full p-5 text-white sm:hover:bg-gray-600"
              @click="toggleClose"
            >
              <div class="flex items-center">
                <img class="h-6" src="/images/characters/ando.png" />
                <div class="ml-2 text-lg">キャラクター</div>
              </div>
            </nuxt-link>
          </li>
          <li class="">
            <nuxt-link
              :to="routePathList('sns_suzuri')"
              target="_blank"
              class="inline-block w-full p-5 text-white sm:hover:bg-gray-600"
              @click="toggleClose"
            >
              <div class="flex items-center">
                <img class="h-6" src="@/assets/images/icon_goods.svg" />
                <div class="ml-2 text-lg">グッズ</div>
              </div>
            </nuxt-link>
          </li>
          <li class="">
            <nuxt-link
              :to="routePathList('sns_x')"
              target="_blank"
              class="inline-block w-full p-5 text-white sm:hover:bg-gray-600"
              @click="toggleClose"
            >
              <div class="flex items-center">
                <img class="m-1 h-4" src="@/assets/images/logo-black-x.png" />
                <div class="ml-2 text-lg">X(旧Twitter)</div>
              </div>
            </nuxt-link>
          </li>
          <li class="">
            <nuxt-link
              :to="routePathList('sns_suzuri')"
              target="_blank"
              class="inline-block w-full p-5 text-white sm:hover:bg-gray-600"
              @click="toggleClose"
            >
              <div class="flex items-center">
                <img class="h-6" src="@/assets/images/icon_suzuri.png" />
                <div class="ml-2 text-lg">SUZURI</div>
              </div>
            </nuxt-link>
          </li>
          <!-- <li class="">
            <nuxt-link
              :to="routePathList('information_list')"
              class="inline-block w-full p-5 text-white sm:hover:bg-gray-600"
              @click="toggleClose"
            >
              <div class="flex items-center">
                <img class="" src="/images/bell.svg" />
                <div class="ml-2 text-lg">お問い合わせ</div>
              </div>
            </nuxt-link>
          </li> -->
        </ul>
      </div>
    </transition>
  </div>
</template>

<style>
  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
</style>
