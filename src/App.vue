<script setup lang="ts">
  import {useCompLayoutState} from "@/stores/comp-layout-state.ts";
  import Page from "@/components/Page.vue";
  import {onMounted, onUnmounted} from "vue";

  const compLayoutState = useCompLayoutState();

  function handleResize():void {
    compLayoutState.calcCurrentState(window.innerWidth);
  }

  onMounted(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  })
</script>

<template>
  <Page />
</template>

<style scoped>
</style>
