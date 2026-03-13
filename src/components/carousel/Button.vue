<script setup lang="ts">
  import {useCarouselHeights} from "@/stores/carousel-comps-height.ts";
  import {ref, watch} from "vue";
  import {storeToRefs} from "pinia";

  import type { Ref } from "vue";
  type ButtonTypes = "next" | "prev";

  const {
    vertTransform,
    btnJustify
  } = defineProps<{
    vertTransform: number
    btnJustify: ButtonTypes
  }>();

  const compHeights = useCarouselHeights();
  const {heightOuter, heightButton} = storeToRefs(compHeights);

  const transformStyle:Ref<string> = ref("");
  const size:string = "30px";
  const position:string = btnJustify === "next" ? "end" : "start";

  const setTransform = (transValue:number) => transformStyle.value = `-${transValue}px`;

  function calcButtonTransform():void {
    setTransform((heightOuter.value / 2) - heightButton.value);
  }

  watch(heightOuter, () => calcButtonTransform());
</script>

<template>
  <button class="carousel-button"></button>
</template>

<style scoped>
  .carousel-button{
    --y-trans: v-bind(transformStyle);
    width: v-bind('size');
    height: v-bind('size');
    border-radius: 50%;
    justify-self: v-bind('position');
    transform: translateY(var(--y-trans));
  }
</style>
