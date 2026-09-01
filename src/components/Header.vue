<script setup lang="ts">
  import {ref, useTemplateRef, watch, computed, onBeforeMount} from "vue";
  import {storeToRefs} from "pinia";
  import Hamburger from "@/components/hambuger/Hamburger.vue";
  import TheNavLinks from "@/components/nav-links/TheNavLinks.vue";
  import {useCompLayoutState} from "@/stores/comp-layout-state.ts";

  import type { Ref, TemplateRef } from "vue";

  const {collapse} = defineProps<{collapse: boolean}>();

  const _headBottom:TemplateRef<HTMLElement> = useTemplateRef("head-bottom");

  const breakPointStore = useCompLayoutState();
  const {breakPointState} = storeToRefs(breakPointStore);

  const slideTime:Ref<number> = ref(0.5);

  const hamburgerVisibility:Ref<boolean> = ref(false);
  const displayHamburger = ():boolean => hamburgerVisibility.value = true;
  const hideHamburger = ():boolean => hamburgerVisibility.value = false;

  //link-wrapper visibility
  const navLinkVisibility:Ref = ref(false);
  const displayNavLinks = ():boolean => navLinkVisibility.value = true;
  const hideNavLinks = ():boolean => navLinkVisibility.value = false;

  //User click Nav state
  const clickState:Ref<boolean> = ref(false);
  const getUserState = ():boolean => clickState.value;
  const toggleUserState = ():boolean => clickState.value = !clickState.value
  const setUserState = (state:boolean):boolean => clickState.value = state

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
  const headBottom = ():HTMLElement|null => _headBottom.value;
  const hideBottom = ():void => headBottom()?.classList.add("bottom-hide");
  const displayBottom = ():void => headBottom()?.classList.remove("bottom-hide");

  function handleHeadCollapseState(state:boolean):void {
    if(breakPointStateCheck()) {
      state ? toggleHeadCollapse() : toggleHeadExpansion();
    }
  }

  function toggleHeadCollapse():void {
    // hideBottom()
    hideNavLinks()
    displayHamburger()
  }

  function toggleHeadExpansion():void {
    setUserState(false);
    // displayBottom()
    displayNavLinks();
    hideHamburger()
  }

  const navVisibility = computed(() => {
    return navLinkVisibility.value || clickState.value;
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
          @click="toggleUserState"
          :isClicked="clickState"
          :size="40"/>
      </span>
        <span id="heading-wrapper">
        <h1 v-to-heading>heading</h1>
      </span>
    </div>

      <div
        id="head-bottom"
        ref="head-bottom"
      >
        <Transition
          name="nav-slide"
          mode="out-in"
          appear
        >
          <TheNavLinks :isVisible="navVisibility" />
        </Transition>
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

  header {
    --slide-time: v-bind(slideTime + "s");

    width: 100%;
    height: auto;
    display: grid;
    grid-template-rows: 1fr auto;

    top: 0px;
    position: sticky;
    z-index: 0;
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

  #head-bottom.bottom-hide  {
    animation: bottomHide var(--slide-time) ease-in-out;
  }

  .bottom-hide-enter-active,
  .bottom-hide-leave-active {
    transition: all var(--slide-time) ease-in-out;
  }

  .bottom-hide-enter-from,
  .bottom-hide-leave-to {
    height: 0%;
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
