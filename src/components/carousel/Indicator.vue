<script setup lang="ts">
  const indicatorSize:string = "20px";
</script>

<template>
  <li class="carousel-indicator">
    <button class="indicator"></button>
  </li>
</template>

<style scoped>
  .indicator {
    width: v-bind('indicatorSize');
    height: v-bind('indicatorSize');
    border-radius: 50%;
  }
</style>
