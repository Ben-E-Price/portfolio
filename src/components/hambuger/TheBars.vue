<script setup lang="ts">
  import TheBar from './TheBar.vue'
  import {computed} from "vue";

  const crossTransition = computed(() => hoverTransition || clickState);

</script>

<template>
  <div id="bar-wrapper">
    <TheBar />
    <TheBar />
    <TheBar />
  </div>
</template>

<style scoped>

</style>
