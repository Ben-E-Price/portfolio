<script setup lang="ts">
  import type {LiveExample} from "@/types/content.ts";
  import {reactive, watch} from "vue";

  const {
    content,
    slideNum,
    currentSlide
  } = defineProps<{
    content: LiveExample,
    slideNum:number,
    currentSlide:number
  }>();

  const styles = reactive({
    transform: `translateX(${slideNum}%)`,
  })

  watch(() => currentSlide, (newSlide) => {
  })

</script>

<template>
  <span class="carousel-card" :style="styles">

  </span>
</template>

<style scoped>
  .carousel-card {
    display: inline-block;
    width: 100%;
    height: 250px;
    border: red solid 1px;
  }
</style>
