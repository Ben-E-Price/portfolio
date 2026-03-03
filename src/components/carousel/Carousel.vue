<script setup lang="ts">
  import InnerCard from "@/components/carousel/InnerCard.vue";
  import Button from "@/components/carousel/Button.vue";
  import IndicatorContainer from "@/components/carousel/IdicatorContainer.vue";

  import {useCarouselHeights} from "@/stores/carousel-comps-height.ts";
  import {onMounted, ref} from "vue";

  import type {Ref} from "vue";
  import type {LiveExample} from "@/types/content.ts";
  import {storeToRefs} from "pinia";

  const {content} = defineProps<{content: LiveExample}>();

  const compHeights = useCarouselHeights();
  const {heightOuter, heightControls} = storeToRefs(compHeights);

  const correctedOuterHeight:Ref<string> = ref("");
  const controlsTransformPer:number = 1;
  const controlsTransStyle:string = `-${controlsTransformPer * 100}%`;

  const setCorrectedOuterHeight = (height:number) => correctedOuterHeight.value = `${height}px`

  function correctOuterHeight():void  {
    const heightCorrected: number = heightOuter.value - (heightControls.value * controlsTransformPer);
    setCorrectedOuterHeight(heightCorrected);
 }

  function initComponents():void {
    compHeights.setHeights()
    correctOuterHeight()
  }

  onMounted(() => initComponents());
</script>

<template>
    <div id="carousel-outer">
      <div id="slides-wrapper">
        <InnerCard
          v-for="(data, index) in content"
          :transX="Number(index) * 100"
          :content="data" />
      </div>

      <div id="carousel-controls">
        <Button
          :btnJustify="'prev'"
        />
        <IndicatorContainer/>
        <Button
          :btnJustify="'next'"
        />
      </div>
    </div>
</template>

<style scoped>
  #carousel-outer {
    --correct-height: v-bind('correctedOuterHeight');
    height: var(--correct-height);
    display: grid;
    grid-template-rows: auto auto;
    border: black solid 1px;
    width: 100%;
    padding: 5px;
  }

  #carousel-controls {
    --y-trans: v-bind('controlsTransStyle');
    transform: translateY(var(--y-trans));
    display: grid;
    grid-template-columns: auto 33% auto;
  }

</style>
