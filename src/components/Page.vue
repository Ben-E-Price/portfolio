<script setup lang="ts">
  import Header from "./Header.vue";
  import Main from "./Main.vue";
  import Footer from "./Footer.vue";
  import {onMounted, ref} from "vue";

  import type {Ref} from "vue";

  //Sticky Heading
  const stickClass:string = "sticky"

  type PageElement = Ref<HTMLElement>;

  const header:PageElement = ref();
  const getHeader = ():HTMLHeadingElement => header.value.elHead as HTMLHeadingElement;

  const main:PageElement = ref();
  const getAbout = ():HTMLElement => main.value.elMain.getElementsByClassName("about")[0] as HTMLElement;

  const headHeight:Ref<number> = ref(0);
  const setHeadHeight = ():number => headHeight.value = getHeader().getBoundingClientRect().height;
  const getHeadHeight = ():number => headHeight.value;

  const obvOptions:Ref<IntersectionObserverInit> = ref({
    root: null,
    rootMargin: "0px",
    threshold: 1,
  })

  const updateMargin = ():string => {
    setHeadHeight();
    obvOptions.value.rootMargin = `-${getHeadHeight()}px`
  }

  type HeaderClassHandler = (el:HTMLElement, elClass:string) => string

  const classAdd:HeaderClassHandler = (el, elClass) => el.classList.add(elClass);
  const classRemove:HeaderClassHandler = (el, elClass) => el.classList.remove(elClass);

  function handleStickyHeading(entries:IntersectionObserverEntry[]):void {
    const {isIntersecting} = entries[0];
    updateMargin();

    isIntersecting ? classRemove(getHeader(), stickClass) :  classAdd(getHeader(), stickClass);
  }

  function initObserver():void {
    const observer:IntersectionObserver = new IntersectionObserver((entries) => handleStickyHeading(entries) , obvOptions.value);
    observer.observe(getAbout());
  }

  function initStickyHeader():void {
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
