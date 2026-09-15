<script setup lang="ts">
  import {ref, useTemplateRef, watch, computed, onBeforeMount} from "vue";
  import {storeToRefs} from "pinia";

  import Hamburger from "@/components/hambuger/Hamburger.vue";
  import TheNavLinks from "@/components/nav-links/TheNavLinks.vue";

  import {useCompLayoutState} from "@/stores/comp-layout-state.ts";
  import {useHamburgerClickState} from "@/stores/ham-click.ts";

  import type { Ref, TemplateRef } from "vue";

  const {collapse} = defineProps<{collapse: boolean}>();

  const _headBottom:TemplateRef<HTMLElement> = useTemplateRef("head-bottom");

  const breakPointStore = useCompLayoutState();
  const {breakPointState} = storeToRefs(breakPointStore);

  const slideTime:Ref<number> = ref(0.5);
  const slideDuration:string = `${slideTime.value}s`;

  const hamburgerVisibility:Ref<boolean> = ref(false);
  const displayHamburger = ():boolean => hamburgerVisibility.value = true;
  const hideHamburger = ():boolean => hamburgerVisibility.value = false;

  //link-wrapper visibility
  const navLinkVisibility:Ref = ref(false);
  const displayNavLinks = ():boolean => navLinkVisibility.value = true;
  const hideNavLinks = ():boolean => navLinkVisibility.value = false;

  //User click Nav state
  const hamburgerClickState = useHamburgerClickState();
  const {isClicked} = storeToRefs(hamburgerClickState);
  const getUserState = ():boolean => isClicked.value;

  //Heading collapse horizontal
  const breakPointStateCheck = ():boolean => breakPointState.value !== 0
  const hideNavOnBreakPoint = ():boolean => breakPointStateCheck() && !collapse

  function configHeadMobile():void {
    hideNavLinks()
    displayHamburger()
  }

  function configHeadDesktop():void {
    displayNavLinks();
    hideHamburger()
  }

  function handleResponsiveChange():void {
    if(getUserState()) {
      return
    } else {
      hideNavOnBreakPoint() ? configHeadDesktop() : configHeadMobile();
    }
  }

  function initHamburgerState():void {
    !breakPointStateCheck() ? displayHamburger() : hideHamburger();
  }

  //Heading collapse vertical
  function handleHeadCollapseState(state:boolean):void {
    if(breakPointStateCheck()) {
      state ? toggleHeadCollapse() : toggleHeadExpansion();
    }
  }

  function toggleHeadCollapse():void {
    hideNavLinks()
    displayHamburger()
  }

  function toggleHeadExpansion():void {
    hamburgerClickState.$reset();
    displayNavLinks();
    hideHamburger()
  }

  const navVisibility = computed(() => {
    return navLinkVisibility.value || isClicked;
  })

  onBeforeMount(() => {
    initHamburgerState();
  });

  watch(breakPointState, () => {
    handleResponsiveChange();
  })

  watch(() => collapse, (newState) => {
    handleHeadCollapseState(newState);
  })
</script>

<template>
  <header>
    <div id="head-top">
      <span id="hamburger-wrapper">
        <Hamburger
          v-if="hamburgerVisibility"
          :size="40"/>
      </span>
        <span id="heading-wrapper">
        <h1 v-to-heading>heading</h1>
      </span>
    </div>

    <div id="head-bottom" :class="[navVisibility ? 'bottom-show' : 'bottom-hide']">
      <TheNavLinks :isVisible="navVisibility" :slideTime="slideDuration"/>
    </div>
  </header>
</template>

<style scoped>
  @keyframes bottomHide {
    from  {
      height: 100%;
    }

    to {
      height: 0%;
    }
  }

  @keyframes bottomShow {
    from  {
      height: 0%;
    }

    to {
      height: 100%;
    }
  }

  header {
    --slide-time: v-bind(slideDuration);

    width: 100%;
    height: auto;
    display: grid;
    grid-template-rows: 1fr auto;

    top: 0px;
    position: sticky;
    z-index: 1;
  }

  #heading-wrapper {
    display: flex;
    justify-content: center;
  }

  #head-top {
    display: grid;
    grid-template-columns: auto auto;
    background-color: white;
    padding: 0.3rem;
  }

  #head-bottom {
    z-index: -1;
    overflow: hidden;
    background-color: green;
  }

  .bottom-hide  {
    animation: bottomHide var(--slide-time) ease-in-out;
    animation-delay: 0.1s;
  }

  .bottom-show {
    animation: bottomShow var(--slide-time) ease-in-out;
  }

  @media (max-width: 600px) {
    header {
      grid-template-rows: auto auto;
    }

    #link-wrapper{
      width: 100%;
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
