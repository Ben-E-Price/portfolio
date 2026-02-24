<script setup lang="ts">
const {content} = defineProps<{content:string}>();
</script>

<template>
  <div class="accordion-panel">
    <p class="exp-description">{{ content }}</p>
  </div>
</template>

<style scoped>

</style>
