<script setup lang="ts">
  import InnerCard from "@/components/carousel/InnerCard.vue";
  import Button from "@/components/carousel/Button.vue";
  import IndicatorContainer from "@/components/carousel/IdicatorContainer.vue";
  import type {LiveExample} from "@/types/content.ts";
  import {onMounted} from "vue";

  const {content} = defineProps<{content: LiveExample}>();

  const controlsTransformPer:number = 1;
  const controlsTransStyle:string = `-${controlsTransformPer * 100}%`;

  const getElementHeight = (element: HTMLElement):number => element.getBoundingClientRect().height;

  function setOuterHeight(outer:HTMLElement, controls:HTMLElement):void  {
    const heightOuter:number = getElementHeight(outer);
    const heightControls:number = getElementHeight(controls);
    const heightCorrected: number = heightOuter - (heightControls * controlsTransformPer);

    outer.style.height = heightCorrected + `px`;
 }

  function setButtonTransform(outer:HTMLElement, button:HTMLElement):void {
    const outerHeight:number = getElementHeight(outer);
    const buttonHeight:number =  getElementHeight(button);
    const transform:number = (outerHeight / 2) - (buttonHeight / 2);

    button.style.transform = `translateY(-${transform}px)`;
  }

  function handleOuterSetup():void {
    const outer:HTMLElement | null = document.getElementById("carousel-outer");
    const controls:HTMLElement | null = document.getElementById("carousel-controls");
    const button:HTMLElement | null = document.getElementsByClassName("carousel-button")[0];

    setOuterHeight(outer, controls);
    setButtonTransform(outer, button);
  }

  onMounted(() => handleOuterSetup());
</script>

<template>
    <div id="carousel-outer" >
      <InnerCard :content="content" />
      <div id="carousel-controls">
        <Button :btnJustify="'prev'"/>
        <IndicatorContainer/>
        <Button :btnJustify="'next'"/>
      </div>
    </div>
</template>

<style scoped>
  #carousel-outer {
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
