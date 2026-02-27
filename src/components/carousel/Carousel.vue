<script setup lang="ts">
  import InnerCard from "@/components/carousel/InnerCard.vue";
  import Button from "@/components/carousel/Button.vue";
  import IndicatorContainer from "@/components/carousel/IdicatorContainer.vue";
  import type {LiveExample} from "@/types/content.ts";

  const {content} = defineProps<{content: LiveExample}>();

  function setOuterHight(outer:HTMLElement):void  {

  }

  function setOuterPadding(outer:HTMLElement):void {

  }

  function handleOuterSetup():void {
    const outer:HTMLElement = document.getElementById("carousel-outer");
    
  }
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
