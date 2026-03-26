<script setup lang="ts">
  import Header from "./Header.vue";
  import Main from "./Main.vue";
  import Footer from "./Footer.vue";
  import {onMounted, ref} from "vue";

  import type {Ref} from "vue";

  //Sticky Heading
  type PageElement = Ref<HTMLElement>;

  const getElementByTag = (tag: string):HTMLElement => document.getElementById(tag);

  const header:PageElement = ref();
  const getHeader = ():HTMLHeadingElement => header.value.elHead as HTMLHeadingElement;

  const main:PageElement = ref();
  const getMain = ():HTMLElement => main.value.elMain as HTMLElement;

  const headHeight:Ref<number> = ref(0);
  const setHeadHeight = (height:number):number => headHeight.value = height;
  const getHeadHeight = ():number => headHeight.value;

  function initHeading():void {
    console.log(getHeader(), getMain());
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
    const margin:string = `${getHeadHeight()}px`
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

  onMounted(() => {
    initStickyHeader()
  })
</script>

<template>
  <Header ref="header"/>
  <Main  ref="main"/>
  <Footer />
</template>

<style scoped>
</style>
