<script setup lang="ts">
  import Header from "./Header.vue";
  import Main from "./Main.vue";
  import Footer from "./Footer.vue";
  import {onMounted, ref} from "vue";

  import type {Ref} from "vue";

  //Sticky Heading
  const headerClass:string[] = ["sticky", "collapse"];

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
    obsOptions.value.rootMargin = `-${getHeadHeight() / 2}px`
  }

  type HeaderClassHandler = (el:HTMLElement, classList:string[]) => void
  const classAdd:HeaderClassHandler = (el, classList) => classList.forEach(curClass => el.classList.add(curClass));
  const classRemove:HeaderClassHandler = (el, classList) => classList.forEach(curClass => el.classList.remove(curClass));

  function handleStickyHeading(entries:IntersectionObserverEntry[]):void {
    const {isIntersecting} = entries[0];
    updateMargin();

    isIntersecting ? classRemove(getHeader(), headerClass) :  classAdd(getHeader(), headerClass);
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
  <Header ref="header" @vue:mounted="initObserver"/>
  <Main />
  <Footer />
</template>

<style scoped>
</style>
