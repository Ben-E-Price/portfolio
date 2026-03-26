<script setup lang="ts">
  import {useCompLayoutState} from "@/stores/comp-layout-state.ts";
  import Header from '@/components/Header.vue';
  import Main from '@/components/Main.vue';
  import Footer from '@/components/Footer.vue';
  import {onMounted, onUnmounted} from "vue";

  const compLayoutState = useCompLayoutState();

  function handleResize():void {
    compLayoutState.calcCurrentState(window.innerWidth);
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


  onMounted(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  })
</script>

<template>
  <Header />
  <Main />
  <Footer />
</template>

<style scoped>
</style>
