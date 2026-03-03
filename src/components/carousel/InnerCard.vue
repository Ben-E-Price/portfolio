<script setup lang="ts">
  import type {LiveExample} from "@/types/content.ts";
  import {reactive} from "vue";

  const {content, transX} = defineProps<{content: LiveExample, transX:number}>();

  const styles = reactive({
    transform: `translateX(${transX}%)`,
  })
</script>

<template>
  <div class="carousel-card" :style="styles">

  </div>
</template>

<style scoped>
  .carousel-card {
    overflow: hidden;
    border: red solid 1px;
    height: 250px
  }
</style>
