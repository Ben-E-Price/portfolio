<script setup lang="ts">
  import type {LiveExample} from "@/types/content.ts";
  import {onBeforeMount, type Ref, ref, watch} from "vue";
  import {useCurrentSlide} from "@/stores/carousel-current-slide.ts";

  const {
    content,
    slideNum,
    currentSlide,
  } = defineProps<{
    content: LiveExample,
    slideNum:number,
    currentSlide:number,
  }>();

  const slide = useCurrentSlide();
  const {isClone} = slide;

  const stylesInline:Ref<object> = ref({
    transform: ``,
  })

  const styleTransition:Ref<string> = ref("0.5s");

  const setTransform = ():string => stylesInline.value.transform = `translateX(${((slideNum - 1) - currentSlide) * 100}%)`;

  const setTransition = (value:string):string => styleTransition.value = value;
  const hideTransition = ():string => setTransition("0s");
  const resetTransition = ():string => setTransition("0.5s");

  function checkTransition():void {
    if(isClone()) {
      hideTransition();
    } else {
      resetTransition();
    }
  }

  watch(() => currentSlide, () => {
    setTransform();
  })

  onBeforeMount(() => setTransform())

</script>

<template>
  <span
    @transitionend="checkTransition"
    class="carousel-card"
    :style="stylesInline"
  >

  </span>
</template>

<style scoped>
  .carousel-card {
    transition: v-bind(styleTransition);
    min-width: 100%;
    height: 250px;
    border: red solid 1px;
  }

</style>
