<script setup lang="ts">
import {type Ref, ref, watch} from "vue";
import {useCompLayoutState} from "@/stores/comp-layout-state.ts";
import {storeToRefs} from "pinia";

  const breakPointStore = useCompLayoutState();
  const {breakPointState} = storeToRefs(breakPointStore);
  const navLinkVisibility:Ref = ref(false);

  function toggleNavLinks():void {
    navLinkVisibility.value = !navLinkVisibility.value;
  }

  function setNavLinkVis(status:boolean):void {
    navLinkVisibility.value = status;
  }

  function handleNavLinkBreakPoint(stateCheck:number):void {
    if (stateCheck !== 0) {
      setNavLinkVis(true);
    } else {
      setNavLinkVis(false);
    }
  }
  watch(breakPointState, (newState) => {
    handleNavLinkBreakPoint(newState);
  })
</script>

<template>
  <header>
    <span id="menu-icon-wrapper" @click="toggleNavLinks">

    </span>
    <span id="heading-wrapper">
      <h1 v-to-heading>heading</h1>
    </span>

    <nav id="link-wrapper" v-if="navLinkVisibility">
      <a class="head-link" >Link</a>
      <a class="head-link">Link</a>
      <a class="head-link">Link</a>
      <a class="head-link">Link</a>
      <a class="head-link">Link</a>
    </nav>
  </header>
</template>

<style scoped>
  header {
    width: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
  }

  #heading-wrapper {
    display: flex;
    justify-content: center;
  }

  #menu-icon-wrapper {
    display: none;
    border: solid 1px black;
  }

  #link-wrapper {
    width: 100%;
    grid-column-start: span 2;
  }

  @media (max-width: 600px) {
    header {
      grid-template-columns: 25vw auto;
    }

    #link-wrapper{
      width: 100%;
      background: blue;
    }

    .head-link {
      display: block;
      width: 100%;
    }

    #menu-icon-wrapper{
      display: block;
    }
  }
</style>
