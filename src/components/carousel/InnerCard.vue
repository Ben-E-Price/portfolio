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

  const setTransform = ():string => stylesInline.value.transform = `translateX(${((slideNum - 1) - currentSlide) * 100}%)`;
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

  function calcDragDiff(diff:number) {
    console.log(diff);
  }

  watch(() => currentSlide, () => {
    setTransform();
  })

  watch(() => dragDistance, (diff) => calcDragDiff(diff))

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
