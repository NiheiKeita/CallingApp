<script setup lang="ts">
  defineProps({
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
  <h2 class="flex w-full items-center justify-center text-xl font-bold">
    <img class="mx-1 h-16 lg:h-24" :src="image" :alt="alt" />
  </h2>
</template>
