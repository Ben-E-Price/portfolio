<script setup lang="ts">
  import {ref, useTemplateRef, watch, computed} from "vue";
  import {storeToRefs} from "pinia";
  import Hamburger from "@/components/hambuger/Hamburger.vue";
  import {useCompLayoutState} from "@/stores/comp-layout-state.ts";

  import type { Ref, TemplateRef } from "vue";

  const {collapse} = defineProps<{collapse: boolean}>();

  const classCollapse:string = "collapse";

  const elHead:TemplateRef<HTMLElement> = useTemplateRef("header");

  const breakPointStore = useCompLayoutState();
  const {breakPointState} = storeToRefs(breakPointStore);

  const slideTime:Ref<number> = ref(1);

  const hamburgerVisibility:Ref<boolean> = ref(false);
  const setHamburgerVisibility = (visible:boolean):boolean => hamburgerVisibility.value = visible;

  //link-wrapper visibility
  const navLinkVisibility:Ref = ref(false);
  const displayNavLinks = ():void => navLinkVisibility.value = true;
  const hideNavLinks = ():void => navLinkVisibility.value = false;

  //User click Nav state
  const userSetState:Ref<boolean> = ref(false);
  const getUserState = ():boolean => userSetState.value;
  const toggleUserState = ():boolean => userSetState.value = !userSetState.value
  const setUserState = (state:boolean):void => userSetState.value = state

  //Heading collapse horizontal
  const breakPointStateCheck = ():boolean => breakPointState.value !== 0
  const hideNavOnBreakPoint = ():boolean => breakPointStateCheck() && !collapse

  function configHeadMobile():void {
    setNavLinkVis(false);
    setHamburgerVisibility(true);
  }

  function configHeadDesktop():void {
    setNavLinkVis(true);
    setHamburgerVisibility(false);
  }

  function handleResponsiveChange():void {
    if(getUserState()) {
      return
    } else {
      hideNavOnBreakPoint() ? configHeadDesktop() : configHeadMobile();
    }
  }

  //Heading collapse vertical
  const getHead = ():HTMLElement | null => elHead.value;

  function handleHeadCollapseState(state:boolean):void {
    if(breakPointStateCheck()) {
      state ? toggleHeadCollapse() : toggleHeadExpansion();
    }
  }

  function toggleHeadCollapse(addClass:string = classCollapse):void {
    getHead()?.classList.add(addClass);
    setNavLinkVis(false);
    setHamburgerVisibility(true);
  }

  function  toggleHeadExpansion(removeClass:string = classCollapse):void {
    getHead()?.classList.remove(removeClass);
    setUserState(false);
    setNavLinkVis(true);
    setHamburgerVisibility(false);
  }

  const displayNavLinks = computed(() => {
    return navLinkVisibility.value || userSetState.value;
  })

  watch(breakPointState, (newState) => {
    handleResponsiveChange(newState);
  })

  watch(() => collapse, (newState) => {
    handleHeadCollapseState(newState);
  })
</script>

<template>
  <header ref="header">
    <div id="head-top">
      <span id="hamburger-wrapper">
        <Hamburger
          v-if="hamburgerVisibility"
          @click="toggleUserState"
          :isClicked="userSetState"
          :size="40"/>
      </span>
        <span id="heading-wrapper">
        <h1 v-to-heading>heading</h1>
      </span>
    </div>

    <Transition name="nav-slide">
      <div
        id="head-bottom"
        v-if="displayNavLinks"
      >
        <nav id="link-wrapper">
          <a class="head-link" >Link</a>
          <a class="head-link">Link</a>
          <a class="head-link">Link</a>
          <a class="head-link">Link</a>
          <a class="head-link">Link</a>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
  header {
    --slide-time: v-bind(slideTime + "s");

    width: 100%;
    height: auto;
    display: grid;
    grid-template-rows: 1fr auto;
    background: white;
    padding: 0.5rem;

    top: 0px;
    position: sticky;
    z-index: 0;
    transition: all var(--slide-time) ease-in-out;
  }

  .no-nav {
   grid-template-rows: 1fr 0fr;
  }

  #heading-wrapper {
    display: flex;
    justify-content: center;
  }

  #link-wrapper {
    width: 100%;
    grid-column-start: span 2;
  }

  #head-top {
    display: grid;
    grid-template-columns: auto auto;
    background-color: inherit;
  }

  #head-bottom {
    z-index: -1;
    overflow: hidden;
  }

  .nav-slide-enter-active,
  .nav-slide-leave-active {
    transition: all var(--slide-time) ease-in-out;
  }

  .nav-slide-enter-from,
  .nav-slide-leave-to {
    transform: translateY(-100%);
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
