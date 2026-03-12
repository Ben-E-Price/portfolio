<script setup lang="ts">
  import type {LiveExample} from "@/types/content.ts";
  import {onBeforeMount, type Ref, ref, watch} from "vue";
  import {useCurrentSlide} from "@/stores/carousel-current-slide.ts";

  const {
    content,
    slideNum,
    currentSlide,
    transitionSpeed,
    dragDistance,
  } = defineProps<{
    content: LiveExample,
    slideNum:number,
    currentSlide:number,
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

  const setTransform = ():string => stylesInline.value.transform = transformString(calcSlidePosition(), handleDragDiff(dragDistance))
  const transformString = (slidePos:number, dragDiff:number):string => `translateX(${slidePos + dragDiff}%)`
  const calcSlidePosition = ():number => ((slideNum - 1) - currentSlide) * 100
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

  const calcDragDiff = (dragAmount:number, slideWidth:number):number => (dragAmount / slideWidth) * 100;

  function parseDiff(diff:number):number {
    return Number.isInteger(diff) ? diff : Number(Number.parseFloat(diff).toFixed(2));
  }

  function handleDragDiff(diff:number):number {
    const slideWidth:number = document.getElementsByClassName("carousel-card")[0].getBoundingClientRect().width;
    const percentDiff:number = calcDragDiff(diff,slideWidth);

    return parseDiff(percentDiff);
  }

  watch(() => currentSlide, () => {
    setTransform();
  })

  watch(() => dragDistance, () => setTransform());

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
