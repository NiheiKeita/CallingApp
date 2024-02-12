<script setup lang="ts">
  defineProps({
    msg: {
      type: String,
      default: 'button',
    },
    select: {
      type: Boolean,
      default: false,
    },
  });
  const emit = defineEmits(['click']);

  const clickEvent = () => {
    console.log('ckick'); // eslint-disable-line no-console
    emit('click');
  };
</script>

<template>
  <div
    class="w-1/4 border-[1px] border-white hover:bg-red-500"
    :class="select ? 'bg-red-500' : 'bg-blue-500'"
  >
    <a href="javascript:void(0)" @click="clickEvent()">
      <div
        class="flex h-full w-full items-center justify-center text-center text-lg text-white"
      >
        {{ msg }}
      </div>
    </a>
  </div>
</template>
