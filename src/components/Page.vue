<script setup lang="ts">
  import Header from "./Header.vue";
  import Main from "./Main.vue";
  import Footer from "./Footer.vue";
  import {onMounted, ref} from "vue";

  import type {Ref} from "vue";

  //Sticky Heading
  const stickClass:string = "sticky"

  const header:Ref<HTMLElement | undefined> = ref();
  const getHeader = ():HTMLElement => header.value.elHead;

  const getAbout = ():HTMLElement => document.getElementById("about") as HTMLElement;

  const headHeight:Ref<number> = ref(0);
  const setHeadHeight = ():number => headHeight.value = getHeader().getBoundingClientRect().height;
  const getHeadHeight = ():number => headHeight.value;

  const obsOptions:Ref<IntersectionObserverInit> = ref({
    root: null,
    rootMargin: "0px",
    threshold: 1,
  })

  const updateMargin = ():void => {
    setHeadHeight();
    obsOptions.value.rootMargin = `-${getHeadHeight()}px`
  }

  type HeaderClassHandler = (el:HTMLElement, elClass:string) => void
  const classAdd:HeaderClassHandler = (el, elClass) => el.classList.add(elClass);
  const classRemove:HeaderClassHandler = (el, elClass) => el.classList.remove(elClass);

  function handleStickyHeading(entries:IntersectionObserverEntry[]):void {
    const {isIntersecting} = entries[0];
    updateMargin();

    isIntersecting ? classRemove(getHeader(), stickClass) :  classAdd(getHeader(), stickClass);
  }

  function initObserver():void {
    const observer:IntersectionObserver = new IntersectionObserver((entries) => handleStickyHeading(entries) , obsOptions.value);
    observer.observe(getAbout());
  }

  onMounted(() => {
    initObserver()
  })
</script>

<template>
  <Header ref="header"/>
  <Main />
  <Footer />
</template>

<style scoped>
</style>
