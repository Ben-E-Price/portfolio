<script setup lang="ts">
import {onMounted, type Ref, ref, type TemplateRef, useTemplateRef, watch} from "vue";
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

  //Sticky Heading
  const header:TemplateRef<HTMLHeadingElement> = useTemplateRef("header");
  const getHeader = ():HTMLHeadingElement => header.value as HTMLHeadingElement;

  const headHeight:Ref<number> = ref(0);
  const setHeadHeight = (height:number):number => headHeight.value = height;
  const getHeadHieght = ():number => headHeight.value;

  function initHeading():void {
    setHeadHeight(getHeader().getBoundingClientRect().height);
  }

  type HeaderClassHandler = (el:HTMLElement, elClass:string) => string

  const classAdd:HeaderClassHandler = (el, elClass) => el.classList.add(elClass);
  const classRemove:HeaderClassHandler = (el, elClass) => el.classList.remove(elClass);

  function handleHeading([entry]:IntersectionObserverEntry[]):void {
    const {target, isIntersecting} = entry;
    const className:string = "sticky"

    isIntersecting ? classRemove(target, className) : classAdd(target, className)
  }

  function initObserver():void {
    const margin:string = `${getHeadHieght()}px`
    const options:IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    }

    const observer:IntersectionObserver = new IntersectionObserver((entries) => handleHeading(entries) , options);
    observer.observe(getHeader());
  }

  function initStickyHeader():void {
    initHeading();
    initObserver()
  }

  onMounted(() => initStickyHeader());

  watch(breakPointState, (newState) => {
    handleNavLinkBreakPoint(newState);
  })
</script>

<template>
  <header ref="header">
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

  .sticky {
    top: 0;
    position: sticky;
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
