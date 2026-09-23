<script setup lang="ts">
  import TheBar from './TheBar.vue'
  import {computed, type ComputedGetter, onMounted, ref, useTemplateRef} from "vue";
  import {storeToRefs} from "pinia";
  import {type Ref, type TemplateRef} from 'vue'

  import {useHamburgerClickState} from "@/stores/ham-click.ts";
  import {useHamburgerHoverState} from "@/stores/ham-hover.ts";

  const clickState = useHamburgerClickState();
  const hoverState = useHamburgerHoverState();

  const {isClicked} = storeToRefs(clickState);
  const {isHovered} = storeToRefs(hoverState);

  const barHeight:number = 10;
  const barMovementTop:Ref<string> = ref("");
  const barMovementBottom:Ref<string> = ref("");

  const crossTransition = computed(() => isHovered.value || isClicked.value);
  const classActive = computed(() => [crossTransition.value ? "active" : ""]);

  const barWrapper:TemplateRef<HTMLElement> = useTemplateRef("bar-wrapper");

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

  const barMovementString = (value:number):string => `${value}px`;

  function handleBarMovementCalc():number {
    const parent:HTMLElement = barWrapper.value;
    const child:HTMLElement = barWrapper.value?.children[0];

    const movementDistance:number = calcBarMovementDistance(child, calcTargetLocation(parent));
    barMovementTop.value = barMovementString(movementDistance);
    barMovementBottom.value = barMovementString(movementDistance * -1);
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
