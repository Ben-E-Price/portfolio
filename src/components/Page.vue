<script setup lang="ts">
  import Header from "./Header.vue";
  import Main from "./Main.vue";
  import Footer from "./Footer.vue";
  import {onMounted, ref} from "vue";

  import type {Ref} from "vue";

  //Collapse Heading
  const headerClass:string[] = ["collapse"];

  const collapseState:Ref<boolean> = ref(false);
  const toggleCollapseState = ():boolean => collapseState.value = !collapseState.value

  const header:Ref<HTMLElement | undefined> = ref();
  const getHeader = ():HTMLElement => header.value.elHead;

  const getAbout = ():HTMLElement => document.getElementById("about") as HTMLElement;

  type HeaderClassHandler = (el:HTMLElement, classList:string[]) => void
  const classAdd:HeaderClassHandler = (el, classList) => classList.forEach(curClass => el.classList.add(curClass));
  const classRemove:HeaderClassHandler = (el, classList) => classList.forEach(curClass => el.classList.remove(curClass));

  function handleStickyHeading(entries:IntersectionObserverEntry[]):void {
    const {isIntersecting} = entries[0];
    isIntersecting ? classRemove(getHeader(), headerClass) :  classAdd(getHeader(), headerClass);
  }

  function initObserver():void {
    const options:IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    }
    const observer:IntersectionObserver = new IntersectionObserver((entries) => handleStickyHeading(entries) , options);
    observer.observe(getAbout());
  }

  onMounted(() => {
    initObserver()
  })
</script>

<template>
  <Header
    ref="header"
    :collapse="collapseState"
    @vue:mounted="initObserver"
  />
  <Main />
  <Footer />
</template>

<style scoped>
</style>
