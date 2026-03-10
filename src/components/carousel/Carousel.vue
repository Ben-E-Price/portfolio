<script setup lang="ts">
  import InnerCard from "@/components/carousel/InnerCard.vue";
  import Button from "@/components/carousel/Button.vue";
  import IndicatorContainer from "@/components/carousel/IdicatorContainer.vue";

  import {useCurrentSlide} from "@/stores/carousel-current-slide.ts";
  import {useCarouselHeights} from "@/stores/carousel-comps-height.ts";
  import {onBeforeMount, onMounted, ref, watch} from "vue";

  import type {Ref} from "vue";
  import type {LiveExample} from "@/types/content.ts";
  import {storeToRefs} from "pinia";

  const {content} = defineProps<{content: LiveExample[]}>();

  const compHeights = useCarouselHeights();
  const {heightOuter, heightControls} = storeToRefs(compHeights);

  const slide = useCurrentSlide();
  const {increaseSlide, decreaseSlide, setSlideLimit, setCurrentSlide, isClone} = slide;
  const {currentSlide} = storeToRefs(slide);

  const slideContent:Ref<LiveExample[]> = ref([]);

  const correctedOuterHeight:Ref<string> = ref("");
  const controlsTransformPer:number = 1;
  const controlsTransStyle:string = `-${controlsTransformPer * 100}%`;

  const slideTransitionSpeed:number = 0.5;

  interface DragEndPosition {
    [index:string]:number;

    increase: number;
    decrease: number;
  }

  const clicked:Ref<boolean> = ref(false);
  const dragStartPos:Ref<number> = ref(0);
  const dragEndPos:Ref<DragEndPosition> = ref({});
  const dragDiffrence:Ref<number> = ref(0);

  const setCorrectedOuterHeight = (height:number) => correctedOuterHeight.value = `${height}px`

  function correctOuterHeight():void  {
    const heightCorrected: number = heightOuter.value - (heightControls.value * controlsTransformPer);
    setCorrectedOuterHeight(heightCorrected);
 }

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

  const setClicked = (value:boolean):boolean => clicked.value = value;
  const isClicked = ():boolean => clicked.value;
  const clickTrue = ():boolean => setClicked(true);
  const clickFalse = ():boolean => setClicked(false);

  const setDragStartPos = (value:number):number => dragStartPos.value = value;
  const resetStartPos = ():number => setDragStartPos(0);
  const hasStartPos = () => dragStartPos.value > 0;
  const getDragStartPos = ():number => dragStartPos.value

  const setDragEndPos = (key:string, value:number):number => dragEndPos.value[key] = value;
  const getDragEndPos = ():DragEndPosition => dragEndPos.value;

  function resetDragEndPos():void {
      Object.keys(getDragEndPos()).forEach((key)=>{
        setDragEndPos(key, 0);
      })
  }

  const getCurrentDiff = ():number => dragDiffrence.value;
  const setCurrentDiff = (diff:number):number => dragDiffrence.value = diff;
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
    const endOffset:number = docWidth * 0.1;

    const increaseOffset:number = handleScreenEdge(docWidth, getDragStartPos() - endOffset);
    const decreaseOffset:number = handleScreenEdge(docWidth, getDragStartPos() + endOffset);

    setDragEndPos("increase", increaseOffset);
    setDragEndPos("decrease", decreaseOffset);
  }

  function handleDragStart(event:MouseEvent):void {
    if(!hasStartPos() && !isClicked()){
      setDragStartPos(event.clientX);
      calcDragEndPos();
      clickTrue();
    }
  }

  function resetSlideDrag():void {
    resetStartPos();
    resetDragEndPos();
    clickFalse();
  }

  function handleSlideDrag(event:MouseEvent):void {
    if(isClicked()){

    }
  }

  function initCarousel():void {
    compHeights.setHeights()
    cloneSlideContent()
    correctOuterHeight()
  }

  function initContent():void {
    cloneSlideContent()
    setSlideLimit(slideContent.value.length)
  }

  onBeforeMount(() => initContent());

  onMounted(() => initCarousel());

  watch(currentSlide, (newSlide) => handleSlideWrapping(newSlide, slideTransitionSpeed))
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
        <InnerCard
          v-for="(data, index) in slideContent"
          :currentSlide="currentSlide"
          :slideNum="index"
          :content="data"
          :transitionSpeed="slideTransitionSpeed"
        />
      </div>

      <div id="carousel-controls">
        <Button
          @click="decreaseSlide"
          :btnJustify="'prev'"
        />
        <IndicatorContainer :slideList="content" />
        <Button
          @click="increaseSlide"
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
    grid-template-rows: auto auto;
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

</style>
