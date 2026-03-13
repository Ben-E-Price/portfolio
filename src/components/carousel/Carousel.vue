<script setup lang="ts">
  import Slide from "@/components/carousel/Slide.vue";
  import Button from "@/components/carousel/Button.vue";
  import IndicatorContainer from "@/components/carousel/IdicatorContainer.vue";

  import {useActiveSlide} from "@/stores/carousel-active-slide.ts";
  import {useCarouselHeights} from "@/stores/carousel-comps-height.ts";
  import {onBeforeMount, onMounted, ref, watch} from "vue";

  import type {Ref} from "vue";
  import type {LiveExample} from "@/types/content.ts";
  import {storeToRefs} from "pinia";

  const {content} = defineProps<{content: LiveExample[]}>();

  const compHeights = useCarouselHeights();
  const {heightOuter, heightControls, heightButton} = storeToRefs(compHeights);

  const slide = useActiveSlide();
  const {increaseSlide, decreaseSlide, setSlideLimit, setCurrentSlide, isClone} = slide;
  const {activeSlide} = storeToRefs(slide);

  const slideTransitionSpeed:number = 0.5;

  //Carousel Outer Height Correction
  const correctedOuterHeight:Ref<string> = ref("");
  const controlsTransformPer:number = 1;
  const controlsTransStyle:string = `-${controlsTransformPer * 100}%`;

  const setCorrectedOuterHeight = (height:number) => correctedOuterHeight.value = `${height}px`

  function correctOuterHeight():void  {
    const heightCorrected: number = heightOuter.value - (heightControls.value * controlsTransformPer);
    setCorrectedOuterHeight(heightCorrected);
 }

  //Button Vertical Transform
  const buttonTransform:Ref<number> = ref(0)
  const setButtonTransform = (value:number):number => buttonTransform.value = value;

  function calcButtonTransform():void {
    const controlOverhang:number = heightControls.value - (heightControls.value * controlsTransformPer);
    const outerVertCenter:number = heightOuter.value / 2;
    const buttonVertPosition:number = (outerVertCenter + controlOverhang) - heightButton.value;

    setButtonTransform(buttonVertPosition);
  }

  //Slide Cloning/Wrapping
  const slideContent:Ref<LiveExample[]> = ref([]);

  function cloneSlideContent():void {
    const firstSlide = content.slice(0, 1);
    const lastSlide = content.slice(-1);
    slideContent.value = [...lastSlide, ...content, ...firstSlide]
  }

  function handleSlideWrapping(slideNum: number, transitionDuration:number):void {
    const lastSlide:number = slideContent.value.length - 3;
    const moveDelay:number = (transitionDuration * 1000) + 25;
    let moveTo:number = 0;

    if (!isClone()) {
      return
    } else if (slideNum === slideContent.value.length - 2) {
      moveTo = 0;
    } else {
      moveTo = lastSlide;
    }

    setTimeout(setCurrentSlide, moveDelay, moveTo);
  }

  //Slide Dragging
  interface DragEndPosition {
    [index:string]:number;

    increase: number;
    decrease: number;
  }

  const clicked:Ref<boolean> = ref(false);
  const dragStartPos:Ref<number> = ref(0);
  const dragDifference:Ref<number> = ref(0);
  const currentPosition:Ref<number> = ref(0);
  const dragEndPos:Ref<DragEndPosition> = ref({
    increase: 0,
    decrease:0
  });

  const setClicked = (value:boolean):boolean => clicked.value = value;
  const isClicked = ():boolean => clicked.value;
  const clickTrue = ():boolean => setClicked(true);
  const clickFalse = ():boolean => setClicked(false);

  const setDragStartPos = (value:number):number => dragStartPos.value = value;
  const resetDragStartPos = ():number => setDragStartPos(0);
  const hasStartPos = () => dragStartPos.value > 0;
  const getDragStartPos = ():number => dragStartPos.value

  const setDragEndPos = (key:string, value:number):number => dragEndPos.value[key] = value;
  const getDragEndPos = ():DragEndPosition => dragEndPos.value;

  function resetDragEndPos():void {
      Object.keys(getDragEndPos()).forEach((key)=>{
        setDragEndPos(key, 0);
      })
  }

  const setCurrentDiff = (diff:number):number => dragDifference.value = diff;
  const resetCurrentDiff = ():number => setCurrentDiff(0);

  const getDocumentWidth = ():number => document.getElementsByTagName("html")[0].getBoundingClientRect().width

  function handleScreenEdge(docWidth: number, endPoint:number):number {
    const edgeMargin:number = 10;

    if(endPoint > 0 && endPoint < docWidth) {
      return endPoint
    } else if (endPoint >= docWidth) {
      return docWidth - edgeMargin
    } else {
      return edgeMargin
    }
  }

  function calcDragEndPos():void {
    const docWidth:number = getDocumentWidth();
    const endOffset:number = docWidth * 0.2;

    const increaseOffset:number = handleScreenEdge(docWidth, getDragStartPos() - endOffset);
    const decreaseOffset:number = handleScreenEdge(docWidth, getDragStartPos() + endOffset);

    setDragEndPos("increase", increaseOffset);
    setDragEndPos("decrease", decreaseOffset);
  }

  const setCurrentMousePos = (mouse:MouseEvent):number => currentPosition.value = mouse.clientX;
  const getCurrentMousePos = ():number => currentPosition.value;

  function handleDragStart(event:MouseEvent):void {
    if(!hasStartPos() && !isClicked()){
      setDragStartPos(setCurrentMousePos(event));
      calcDragEndPos();
      clickTrue();
    }
  }

  function resetSlideDrag():void {
    resetDragStartPos();
    resetDragEndPos();
    resetCurrentDiff()
    clickFalse();
  }

  function calcCurrentDiff():void {
    setCurrentDiff((getDragStartPos() - getCurrentMousePos()) * -1);
  }

  function checkSlideChange():void {
    const {increase, decrease} = getDragEndPos()
    const mousePos:number = getCurrentMousePos();

    if(mousePos <= increase){
      increaseSlide()
    } else if (mousePos >= decrease) {
      decreaseSlide()
    } else {
      return
    }

    resetSlideDrag()
  }

  function handleSlideDrag(event:MouseEvent):void {
    if(isClicked()){
      setCurrentMousePos(event);
      calcCurrentDiff();
      checkSlideChange();
    }
  }

  //Component Initialisation
  function initCarousel():void {
    compHeights.setHeights()
    cloneSlideContent()
    correctOuterHeight()
    calcButtonTransform()
  }

  function initContent():void {
    cloneSlideContent()
    setSlideLimit(slideContent.value.length)
  }

  onBeforeMount(() => initContent());

  onMounted(() => initCarousel());

  watch(activeSlide, (newSlide) => handleSlideWrapping(newSlide, slideTransitionSpeed))
</script>

<template>
    <div
      id="carousel-outer"
      @mousedown="handleDragStart"
      @mouseup="resetSlideDrag"
      @mouseleave="resetSlideDrag"
      @mousemove="handleSlideDrag"
    >
      <div id="slides-wrapper">
        <Slide
          v-for="(data, index) in slideContent"
          v-bind:key="`slide-${index}`"
          :activeSlide="activeSlide"
          :slideIndex="index"
          :content="data"
          :transitionSpeed="slideTransitionSpeed"
          :dragDistance="dragDifference"
        />
      </div>

      <div id="carousel-controls">
        <Button
          id="btn-prev"
          @click="decreaseSlide"
          :vertTransform="buttonTransform"
          :btnJustify="'prev'"
        />
        <IndicatorContainer
          id="indicator-container"
          :slideList="content"
        />

        <Button
          id="btn-next"
          @click="increaseSlide"
          :vertTransform="buttonTransform"
          :btnJustify="'next'"
        />
      </div>
    </div>
</template>

<style scoped>
  #carousel-outer {
    --correct-height: v-bind('correctedOuterHeight');
    height: var(--correct-height);
    display: grid;
    grid-template-rows: fit-content(100%) auto;
    border: black solid 1px;
    width: 100%;
    padding: 5px;
    overflow: hidden;
  }

  #carousel-controls {
    --y-trans: v-bind('controlsTransStyle');
    transform: translateY(var(--y-trans));
    display: grid;
    grid-template-columns: auto 33% auto;
  }

  #slides-wrapper{
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 100%;
  }

  #indicator-container {
  }

</style>
