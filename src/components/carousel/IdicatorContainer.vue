<script setup lang="ts">
  import Indicator from "@/components/carousel/Indicator.vue";

  import {useCurrentSlide} from "@/stores/carousel-current-slide.ts";
  import {onMounted, watch} from "vue";

  import type {LiveExample} from "@/types/content.ts";
  import {storeToRefs} from "pinia";

  declare global {
    interface NamedNodeMap {
      slide: string;
    }
  }

  const {slideList} = defineProps<{slideList:LiveExample[]}>();

  const slideStore = useCurrentSlide();
  const {setCurrentSlide} = slideStore;
  const {currentSlide} = storeToRefs(slideStore);

  const activeClass:string = "active-indicator";

  const addClass = (el:HTMLElement, addClass:string) => el.classList.add(addClass);
  const removeClass = (el:HTMLElement, removeClass:string) => el.classList.remove(removeClass);
  const isListItem = (el:HTMLElement):boolean => el instanceof HTMLLIElement;
  const getIndicatorSlide = (el:HTMLElement):number => Number(el.getAttribute("slide"));
  const elementFromClassList = (getClass:string, indexPos:number):Element | undefined => document.getElementsByClassName(getClass)[indexPos];

  function getTargetButton(parent:HTMLElement):Element | undefined {
    return parent.getElementsByClassName("indicator")[0];
  }

  function initActiveIndicator():void {
    const firstIndicator = elementFromClassList("indicator", 0) as HTMLElement;
    setActiveIndicator(firstIndicator);
  }

  function setActiveIndicator(el:HTMLElement):void {
    addClass(el, activeClass);
  }

  function removeActiveIndicator():void {
    const activeElement = elementFromClassList(activeClass, 0) as HTMLElement;
    removeClass(activeElement, activeClass);
  }

  function handleActiveIndicator(el:HTMLElement):void {
    removeActiveIndicator();
    setActiveIndicator(el);
  }

  function getTargetIndicator(clickEl:HTMLElement):HTMLElement {
    return isListItem(clickEl) ? getTargetButton(clickEl) as HTMLElement: clickEl;
  }

  function handleClick(e:Event):void {
    const targetIndicator:HTMLElement = getTargetIndicator(e.target as HTMLElement);
    setCurrentSlide(getIndicatorSlide(targetIndicator));
  }

  onMounted(() => {
    initActiveIndicator();
  })

  watch(currentSlide, (newVal) => {
    const newIndicator:HTMLElement = elementFromClassList("indicator", newVal) as HTMLElement;
    handleActiveIndicator(newIndicator);
  })
</script>

<template>
  <ul id="indicator-container">
    <Indicator
      @click="handleClick"
      v-for="(_, index) in slideList"
      :slideNum="index"
      :key="`ind-${index}`"
    />
  </ul>
</template>

<style scoped>
  #indicator-container {
    display: flex;
    align-items: center;
    justify-content: center;
    border: blue solid 1px;
    width: 100%;
  }

  #indicator-container li {
    list-style: none;
  }
</style>
