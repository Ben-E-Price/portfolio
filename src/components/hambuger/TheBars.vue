<script setup lang="ts">
  import TheBar from './TheBar.vue'
  import {computed, ref} from "vue";
  import {storeToRefs} from "pinia";

  import {useHamburgerClickState} from "@/stores/ham-click.ts";
  import {useHamburgerHoverState} from "@/stores/ham-hover.ts";

  const clickState = useHamburgerClickState();
  const hoverState = useHamburgerHoverState();

  const {isClicked} = storeToRefs(clickState);
  const {isHovered} = storeToRefs(hoverState);

  const barHeight:number = 10;

  const crossTransition = computed(() => isHovered || isClicked);

</script>

<template>
  <div id="bar-wrapper">
    <TheBar />
    <TheBar />
    <TheBar />
  </div>
</template>

<style scoped>
  #bar-wrapper {
    --bar-height: v-bind(barHeight + "%");

    display: grid;
    grid-template-rows: var(--bar-height) var(--bar-height) var(--bar-height);
    align-content: space-evenly;
    width: 100%;
    height: 100%;
  }
</style>
