<script setup lang="ts">
  import Indicator from "@/components/carousel/Indicator.vue";
  import {useCurrentSlide} from "@/stores/carousel-current-slide.ts";
  import type {LiveExample} from "@/types/content.ts";

  declare global {
    interface NamedNodeMap {
      slide: string;
    }
  }

  const {slideList} = defineProps<{slideList:LiveExample[]}>();

  const slideStore = useCurrentSlide();
  const {setCurrentSlide} = slideStore;

  const addClass = (el:HTMLElement, addClass:string) => el.classList.add(addClass);
  const isListItem = (el:HTMLElement):boolean => el instanceof HTMLLIElement;
  const getIndicatorSlide = (el:HTMLElement):number => Number(el.attributes.slide.value);

  function getTargetButton(parent:HTMLElement):HTMLElement {
    return parent.getElementsByClassName("indicator")[0];
  }

  function getTargetIndicator(clickEl:HTMLElement):HTMLElement {
    return isListItem(clickEl) ? getTargetButton(clickEl) : clickEl;
  }

  function handleClick(e:Event):void {
    const targetIndicator:HTMLElement = getTargetIndicator(e.target as HTMLElement);
    console.log();
    setCurrentSlide(getIndicatorSlide(targetIndicator));
  }
</script>

<template>
  <ul id="indicator-container">
    <Indicator
      @click="handleClick"
      v-for="(_, index) in slideList"
      :slideNum="index"
    />
  </ul>
</template>

<style scoped>
  #indicator-container {
    border: blue solid 1px;
    width: 100%;
  }
</style>
