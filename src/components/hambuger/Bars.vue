<script setup lang="ts">
  const {classList} = defineProps<{classList: string[]}>();
</script>

<template>
  <span :class="[classList]"></span>
  <span :class="[classList]"</span>
  <span :class="[classList]"></span>
</template>

<style scoped>
  .bar {
    transition: 0.25s;
    transform-origin: left;
    border-radius: 10px;
    width: 100%;
    background-color: black;
  }
</style>
