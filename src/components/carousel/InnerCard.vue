<script setup lang="ts">
  import type {LiveExample} from "@/types/content.ts";
  import {onBeforeMount, type Ref, ref, watch} from "vue";

  const {
    content,
    slideNum,
    currentSlide
  } = defineProps<{
    content: LiveExample,
    slideNum:number,
    currentSlide:number
  }>();

  const setTransform = ():string => styles.value.transform = `translateX(${(slideNum - currentSlide) * 100}%)`;

  const styles:Ref<object> = ref({
    transform: ``,
  })

  watch(() => currentSlide, () => {
    setTransform();
  })

  onBeforeMount(() => setTransform())

</script>

<template>
  <span class="carousel-card" :style="styles">

  </span>
</template>

<style scoped>
  .carousel-card {
    transition: 0.5s;
    display: inline-block;
    width: 100%;
    height: 250px;
    border: red solid 1px;
  }

</style>
