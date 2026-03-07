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

  const transition:Ref<string> = ref("0.5");
  const stylesInline:Ref<object> = ref({
    transform: ``,
  })

  const setTransform = ():string => stylesInline.value.transform = `translateX(${((slideNum - 1) - currentSlide) * 100}%)`;
  const setTransition = (value:string):void => transition.value = value
  const hideTransition = ():void => setTransition("none");
  const resetTransition = ():void => setTransition("0.5");

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
    transition: v-bind(transition);
    min-width: 100%;
    height: 250px;
    border: red solid 1px;
  }

</style>
