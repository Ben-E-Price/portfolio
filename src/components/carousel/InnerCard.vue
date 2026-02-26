<script setup lang="ts">
  import type {LiveExample} from "@/types/content.ts";

  const {content} = defineProps<{content: LiveExample}>();
</script>

<template>
  <div class="carousel-card">

  </div>
</template>

<style scoped>
  .carousel-card {
    background: grey;
    height: 250px
  }
</style>
