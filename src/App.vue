<script setup lang="ts">
  import {useCompLayoutState} from "@/stores/comp-layout-state.ts";
  import Header from '@/components/Header.vue';
  import Main from '@/components/Main.vue';
  import Footer from '@/components/Footer.vue';
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
  <Header />
  <Main />
  <Footer />
</template>

<style scoped>
</style>
