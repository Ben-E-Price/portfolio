<script setup lang="ts">
  import TheBar from './TheBar.vue'
  import {computed, onMounted, ref, useTemplateRef} from "vue";
  import {storeToRefs} from "pinia";
  import type {Ref, TemplateRef} from 'vue'

  import {useHamburgerClickState} from "@/stores/ham-click.ts";
  import {useHamburgerHoverState} from "@/stores/ham-hover.ts";
  import * as assert from "node:assert";

  const clickState = useHamburgerClickState();
  const hoverState = useHamburgerHoverState();

  const {isClicked} = storeToRefs(clickState);
  const {isHovered} = storeToRefs(hoverState);

  const barHeight:number = 10;
  const barMovementTop:Ref<string> = ref("");
  const barMovementBottom:Ref<string> = ref("");

  const crossTransition = computed(() => isHovered.value || isClicked.value);
  const classActive = computed(() => [crossTransition.value ? "active" : ""]);

  interface CalcElements {
    wrapper: HTMLElement,
    bar: HTMLElement,
  }

  const barWrapper:TemplateRef<HTMLElement> = useTemplateRef("bar-wrapper");

  const isElement = (el:any):boolean => el instanceof HTMLElement
  const hasChildren = (el:any):boolean => el.children && el.children.length > 0

  function isParentElement(el:any):asserts el is HTMLElement{
    if (!isElement(el)) throw new Error("Hamburger outer not found");
    if (!hasChildren(el)) throw new Error("Hamburger bar not found");
  }

  const getTopBar = (parent:HTMLElement) => parent.children[0] as HTMLElement;

  function getCalcElements():CalcElements | undefined {
    try {
      isParentElement(barWrapper.value);
      return {wrapper: barWrapper.value, bar: getTopBar(barWrapper.value)}
    } catch (err:any) {
      console.error(err.message);
    }
  }

  interface GetBoundingClient {
    top:number;
    height:number;
  }

  const getBoundingClient = (el:HTMLElement):GetBoundingClient => {
    const {top, height} = el.getBoundingClientRect();
    return {top, height};
  }

  function calcTargetLocation (parent:HTMLElement):number {
    const {top, height} = getBoundingClient(parent);
    return top + (height / 2)
  }

  function calcBarMovementDistance(bar:HTMLElement, targetLocation:number):number {
    const {top, height} = getBoundingClient(bar);
    return targetLocation - top - (height / 2);
  }

  function setBarMovementDistances(distance:number):void {
    barMovementTop.value = barMovementString(distance);
    barMovementBottom.value = barMovementString(distance * -1);
  }

  const barMovementString = (value:number):string => `${value}px`;

  function handleBarMovementCalc():void {
    const {wrapper, bar} = getCalcElements();
    const movementDistance:number = calcBarMovementDistance(bar, calcTargetLocation(wrapper));
    setBarMovementDistances(movementDistance);
  }

  onMounted(() => {
    setTimeout(() => handleBarMovementCalc(), 100)
  })

</script>

<template>
  <div id="bar-wrapper" :class="classActive" ref="bar-wrapper">
    <TheBar id="cross-top" :class="classActive"/>
    <TheBar id="cross-center" :class="classActive"/>
    <TheBar id="cross-bottom" :class="classActive"/>
  </div>
</template>

<style scoped>
  #bar-wrapper {
    --bar-height: v-bind(barHeight + "%");
    --bar-mov-top: v-bind(barMovementTop);
    --bar-mov-bottom: v-bind(barMovementBottom);

    display: grid;
    grid-template-rows: var(--bar-height) var(--bar-height) var(--bar-height);
    align-content: space-evenly;
    width: 100%;
    height: 100%;
  }

  .bar {
    transform-origin: center;
    transition: all 0.2s;
  }

  #cross-top.active {
    translate: 0 var(--bar-mov-top) 0;
    transform: rotate(45deg);
  }

  #cross-center.active {
    transform: scale(0%);
  }

  #cross-bottom.active {
    translate: 0 var(--bar-mov-bottom) 0;
    transform: rotate(-45deg);
  }
</style>
