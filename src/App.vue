<script setup lang="ts">
  import {useCompLayoutState} from "@/stores/comp-layout-state.ts";
  import Header from '@/components/Header.vue';
  import Main from '@/components/Main.vue';
  import Footer from '@/components/Footer.vue';

  const compLayoutState = useCompLayoutState();

  window.onresize = () => {
    compLayoutState.calcCurrentState(window.innerWidth);
  }
</script>

<template>
  <Header />
  <Main />
  <Footer />
</template>

<style scoped>
</style>
