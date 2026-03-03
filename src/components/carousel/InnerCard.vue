<script setup lang="ts">
  import type {LiveExample} from "@/types/content.ts";
  import {reactive, watch} from "vue";

  const {
    content,
    transX,
    currentSlide
  } = defineProps<{
    content: LiveExample,
    transX:number,
    currentSlide:number
  }>();

  const styles = reactive({
    transform: `translateX(${transX}%)`,
  })

  watch(() => currentSlide, (newSlide) => {
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
