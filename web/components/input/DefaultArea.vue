<script setup lang="ts">
  const props = defineProps({
    display: {
      type: String,
      default: 'input_display',
    },
    name: {
      type: String,
      default: 'input_name',
    },
    modelValue: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
  });

  // TODO(エラーメッセージ関連)
  const emits = defineEmits<{
    (e: 'update:modelValue', text: string): void;
    (e: 'change-emit'): void;
  }>();
  const inputData = ref(props.modelValue);
  const inputChange = () => {
    emits('update:modelValue', inputData.value);
    emits('change-emit');
  };
</script>

<template>
  <div class="w-full">
    <div class="flex items-center">
      <p>{{ display }}</p>
    </div>
    <InputDefaultThema
      v-model="inputData"
      class="mt-2"
      :name="name"
      :type="type"
      @change-emit="inputChange"
    />
  </div>
</template>
