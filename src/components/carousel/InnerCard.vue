<script setup lang="ts">
  import type {LiveExample} from "@/types/content.ts";
  import {onBeforeMount, type Ref, ref, watch} from "vue";

  const {
    content,
    slideNum,
    currentSlide,
    styleTransition,
  } = defineProps<{
    content: LiveExample,
    slideNum:number,
    currentSlide:number,
    styleTransition:string,
  }>();

  const stylesInline:Ref<object> = ref({
    transform: ``,
  })

  const setTransform = ():string => stylesInline.value.transform = `translateX(${((slideNum - 1) - currentSlide) * 100}%)`;

  watch(() => currentSlide, () => {
    setTransform();
  })

  onBeforeMount(() => setTransform())

</script>

<template>
  <span class="carousel-card" :style="stylesInline">

  </span>
</template>

<style scoped>
  .carousel-card {
    transition: v-bind(styleTransition);
    min-width: 100%;
    height: 250px;
    border: red solid 1px;
  }

</style>
