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

  const getAbout = ():HTMLElement => document.getElementById("about") as HTMLElement;

  function handleStickyHeading(entries:IntersectionObserverEntry[]):void {
    const {isIntersecting} = entries[0];
    if (isIntersecting) {
      toggleCollapseState();
    }
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
    :collapse="collapseState"
    @vue:mounted="initObserver"
  />
  <Main />
  <Footer />
</template>

<style scoped>
</style>
