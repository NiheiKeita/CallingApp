<script setup lang="ts">
  defineProps({
    link: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
  });
</script>

<template>
  <nuxt-link :to="link" target="_blank">
    <div class="w-full rounded-full bg-SubThemaColor">
      <img class="h-auto w-full rounded-full" :src="image" :alt="alt" />
    </div>
    <div class="mt-2 flex items-center justify-center underline">
      <slot />
    </div>
  </nuxt-link>
</template>
