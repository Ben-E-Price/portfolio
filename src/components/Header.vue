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

  function handleNavLinkCollapse(stateCheck:boolean):void {
    stateCheck ? setNavLinkVis(false) : setNavLinkVis(true);
  }

  const menuClickState:Ref<boolean> = ref(false);
  const toggleClickState = ():boolean => menuClickState.value = !menuClickState.value

  function handleMenuClick():void {
    toggleNavLinks()
    toggleClickState()
  }

  function handleHeadCollapse(state:boolean):void {
    elHead.value?.classList.toggle("collapse");
    handleNavLinkCollapse(state);
  }

  watch(breakPointState, (newState) => {
    handleNavLinkBreakPoint(newState);
  })

  watch(() => collapse, (newState) => {
    handleHeadCollapse(newState);
  })

  defineExpose({elHead})
</script>

<template>
  <header ref="header">
    <div
      id="head-top"
      :class="`dis-flex`"
    >
      <span id="hamburger-wrapper">
        <Hamburger
          @click="handleMenuClick"
          :isClicked="menuClickState"
          :size="40"/>
      </span>
        <span id="heading-wrapper">
        <h1 v-to-heading>heading</h1>
      </span>
    </div>

    <div
      id="head-bottom"
      v-if="navLinkVisibility"
    >
      <nav
        id="link-wrapper"
      >
        <a class="head-link" >Link</a>
        <a class="head-link">Link</a>
        <a class="head-link">Link</a>
        <a class="head-link">Link</a>
        <a class="head-link">Link</a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
  header {
    width: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
    background: white;

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
    z-index: -1;
  }

  .hide {
    transform: translateY(-100%);
  }

  .collapse {
    height: 40px;
    background: #e4e4e4;

    header {
      grid-template-columns: auto auto;
    }

    #hamburger-wrapper {
      display: block;
    }
  }

  @media (max-width: 600px) {
    header {
      grid-template-rows: auto auto;
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
