<script setup lang="ts">
  import {onMounted, watch} from "vue";
  import type {Bars} from "@/types/hamburger.ts";

  const {isHovered} = defineProps<{isHovered: boolean}>();
  const barClass:string[] = ["bar"];
  let bars:Bars = []

  const setBars = ():Bars => bars = Array.from(document.getElementsByClassName(barClass[0])) as Bars;

  const setElementLength = (el:Element, length:number):string => el.style.transform = `scale(${length}%)`;
  const setBarsLength = (length:number):void => bars.forEach((bar:Element) => setElementLength(bar, length));
  const removeBarTransform = ():void => setBarsLength(100);

  function addBarTransform():void {
    const length:number = bars[0].getBoundingClientRect().width;
    const modifier = 1.25;

    bars.forEach((bar:Element, index:number) => {
      const percentDifference = (index / 10) * modifier
      const percentDecimal:number = 1 - percentDifference;
      const barLength:number =  percentDecimal * 100;
      setElementLength(bar, barLength);
    })
  }

  function handleOuterHover(state:boolean):void {
    state ? addBarTransform() : removeBarTransform();
  }

  watch(() => isHovered, handleOuterHover);

  onMounted(() => {
    setBars();
  })
</script>

<template>
  <span :class="barClass"></span>
  <span :class="barClass"</span>
  <span :class="barClass"></span>
</template>

<style scoped>
  .bar {
    transition: 0.25s;
    transform-origin: left;
    border-radius: 10px;
    width: 100%;
    background-color: black;
  }
</style>
