<script setup lang="ts">
  const {classList} = defineProps<{classList: string[]}>();
</script>

<template>
  <div :class="['bar', ...classList]"></div>
</template>

<style scoped>
  .bar {
    border-radius: 10px;
    width: 100%;
    background-color: black;
  }
</style>
