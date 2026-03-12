<script setup lang="ts">
  import type {LiveExample} from "@/types/content.ts";
  import {onBeforeMount, type Ref, ref, watch} from "vue";
  import {useCurrentSlide} from "@/stores/carousel-current-slide.ts";

  const {
    content,
    slideIndex,
    activeSlide,
    transitionSpeed,
    dragDistance,
  } = defineProps<{
    content: LiveExample,
    slideIndex:number,
    activeSlide:number,
    transitionSpeed:number,
    dragDistance:number,
  }>();

  const slide = useCurrentSlide();
  const {isClone} = slide;

  const stylesInline:Ref<object> = ref({
    transform: ``,
  })

  const classList:Ref<string[]> = ref(["carousel-card"]);
  const disableTransition:string = "disable-transition";

  const setTransform = ():string => stylesInline.value.transform = calcCombinedOffset();
  const calcCombinedOffset = ():string => `translateX(${calcIndexOffset() + handleDragOffset()}%)`;
  const calcIndexOffset = ():number => ((slideIndex - 1) - activeSlide) * 100
  const hideTransition = (name:string):string => classList.value.push(name);

  function enableTransition(name:string):void {
    classList.value = classList.value.filter(string => string !== name);
  }

  function handleCloneTransition():void {
    if(isClone()) {
      hideTransition(disableTransition);
      setTimeout(enableTransition, 50, disableTransition);
    }
  }

  const calcDragOffset = (dragAmount:number, slideWidth:number):number => (dragAmount / slideWidth) * 100;

  function truncateOffset(diff:number):number {
    return Number.isInteger(diff) ? diff : Number(Number.parseFloat(diff).toFixed(2));
  }

  const slidePresent = (check:any):boolean => check instanceof Element;

  function handleDragOffset(diff:number = dragDistance):number {
    const slide:Element | undefined = document.getElementsByClassName("carousel-card")[0];

    if(!slidePresent(slide)) {
      return 0
    }

    const slideWidth:number = slide.getBoundingClientRect().width;
    const percentOffset:number = calcDragOffset(diff, slideWidth);

    return truncateOffset(percentOffset);
  }

  watch([() => activeSlide, () => dragDistance], () => setTransform());

  onBeforeMount(() => setTransform())

</script>

<template>
  <span
    @transitionend="handleCloneTransition"
    :class="classList"
    :style="stylesInline"
  >

  </span>
</template>

<style scoped>
  .carousel-card {
    transition: v-bind('`${transitionSpeed}s`');
    min-width: 100%;
    height: 250px;
    border: red solid 1px;
  }

  .disable-transition {
    transition: none;
  }

</style>
