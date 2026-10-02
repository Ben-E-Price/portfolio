<script setup lang="ts">
const {content} = defineProps<{content:string}>();
</script>

<template>
  <div class="exp-wrapper">
    <p class="exp-description">{{ content }}</p>
  </div>
</template>

<style scoped>

</style>
