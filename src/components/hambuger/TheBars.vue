<script setup lang="ts">
  import TheBar from './TheBar.vue'
  import {computed} from "vue";
  import {storeToRefs} from "pinia";

  import {useHamburgerClickState} from "@/stores/ham-click.ts";
  import {useHamburgerHoverState} from "@/stores/ham-hover.ts";

  const clickState = useHamburgerClickState();
  const hoverState = useHamburgerHoverState();

  const {isClicked} = storeToRefs(clickState);
  const {isHovered} = storeToRefs(hoverState);

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

</style>
