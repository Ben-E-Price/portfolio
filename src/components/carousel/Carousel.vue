<script setup lang="ts">
  import InnerCard from "@/components/carousel/InnerCard.vue";
  import Button from "@/components/carousel/Button.vue";
  import IndicatorContainer from "@/components/carousel/IdicatorContainer.vue";

  import {useCurrentSlide} from "@/stores/carousel-current-slide.ts";
  import {useCarouselHeights} from "@/stores/carousel-comps-height.ts";
  import {onBeforeMount, onMounted, ref} from "vue";

  import type {Ref} from "vue";
  import type {LiveExample} from "@/types/content.ts";
  import {storeToRefs} from "pinia";

  const {content} = defineProps<{content: LiveExample[]}>();

  const compHeights = useCarouselHeights();
  const {heightOuter, heightControls} = storeToRefs(compHeights);

  const slide = useCurrentSlide();
  const {increaseSlide, decreaseSlide, setSlideLimit} = slide;
  const {currentSlide} = storeToRefs(slide);

  const slideContent:Ref<LiveExample[]> = ref([]);

  const correctedOuterHeight:Ref<string> = ref("");
  const controlsTransformPer:number = 1;
  const controlsTransStyle:string = `-${controlsTransformPer * 100}%`;

  const setCorrectedOuterHeight = (height:number) => correctedOuterHeight.value = `${height}px`

  function correctOuterHeight():void  {
    const heightCorrected: number = heightOuter.value - (heightControls.value * controlsTransformPer);
    setCorrectedOuterHeight(heightCorrected);
 }

  function initCarousel():void {
    compHeights.setHeights()
    cloneSlideContent()
    correctOuterHeight()
    setSlideLimit(content.length)
  }

  function cloneSlideContent():void {
    const firstSlide = content.slice(0, 1);
    const lastSlide = content.slice(-1);
    slideContent.value = [...lastSlide, ...content, ...firstSlide]
  }

  onBeforeMount(() => cloneSlideContent());

  onMounted(() => initCarousel());
</script>

<template>
    <div id="carousel-outer">
      <div id="slides-wrapper">
        <InnerCard
          v-for="(data, index) in slideContent"
          :currentSlide="currentSlide"
          :slideNum="index"
          :content="data" />
      </div>

      <div id="carousel-controls">
        <Button
          @click="decreaseSlide"
          :btnJustify="'prev'"
        />
        <IndicatorContainer :slideList="content" />
        <Button
          @click="increaseSlide"
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
    overflow: hidden;
  }

  #carousel-controls {
    --y-trans: v-bind('controlsTransStyle');
    transform: translateY(var(--y-trans));
    display: grid;
    grid-template-columns: auto 33% auto;
  }

  #slides-wrapper{
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 100%;
  }

</style>
