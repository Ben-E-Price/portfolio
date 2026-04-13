<script setup lang="ts">
  import { ref, useTemplateRef, watch} from "vue";
  import {storeToRefs} from "pinia";
  import Hamburger from "@/components/hambuger/Hamburger.vue";
  import {useCompLayoutState} from "@/stores/comp-layout-state.ts";

  import type { Ref, TemplateRef } from "vue";

  const {collapse} = defineProps<{collapse: boolean}>();

  const elHead:TemplateRef<HTMLElement> = useTemplateRef("header")

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
    stateCheck !== 0 ? setNavLinkVis(true) : setNavLinkVis(false);
  }

  const menuClickState:Ref<boolean> = ref(false);
  const toggleClickState = ():boolean => menuClickState.value = !menuClickState.value

  function handleMenuClick():void {
    toggleNavLinks()
    toggleClickState()
  }

  watch(breakPointState, (newState) => {
    handleNavLinkBreakPoint(newState);
  })

  defineExpose({elHead})
</script>

<template>
  <header ref="header">
    <span id="hamburger-wrapper">
      <Hamburger
        @click="handleMenuClick"
        :isClicked="menuClickState"
        :size="40"/>
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
    background: white;
    opacity: 0.9;

    top: 0px;
    position: sticky;
  }

  #heading-wrapper {
    display: flex;
    justify-content: center;
  }

  #hamburger-wrapper {
    display: none;
  }

  #link-wrapper {
    width: 100%;
    grid-column-start: span 2;
  }

  .collapse {
    #hamburger-wrapper {
      display: block;
    }
    height: 40px;
    background: #e4e4e4;
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

    #hamburger-wrapper{
      display: block;
    }
  }
</style>
