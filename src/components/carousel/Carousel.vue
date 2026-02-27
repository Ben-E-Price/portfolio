<script setup lang="ts">
  import InnerCard from "@/components/carousel/InnerCard.vue";
  import Button from "@/components/carousel/Button.vue";
  import IndicatorContainer from "@/components/carousel/IdicatorContainer.vue";
  import type {LiveExample} from "@/types/content.ts";
  import {onMounted, ref} from "vue";

  const {content} = defineProps<{content: LiveExample}>();

  const getElementHeight = (element: HTMLElement):number => element.getBoundingClientRect().height;

  function setOuterHeight(outer:HTMLElement, controls:HTMLElement):void  {
    const heightOuter:number = getElementHeight(outer);
    const heightControls:number = getElementHeight(controls);
    const heightCorrected: number = heightOuter - heightControls;

    outer.style.height = heightCorrected + `px`;
  }

  function setOuterPadding(outer:HTMLElement):void {
    console.log(getComputedStyle(outer).padding);

  }

  function handleOuterSetup():void {
    const outer:HTMLElement | null = document.getElementById("carousel-outer");
    const controls:HTMLElement | null = document.getElementById("carousel-controls");

    setOuterHeight(outer, controls);
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
    transform: translateY(-100%);
    display: grid;
    grid-template-columns: auto 33% auto;
  }

</style>
