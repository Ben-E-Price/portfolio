<script setup lang="ts">
import {onMounted, ref, useTemplateRef, watch} from "vue";
  import Bars from "@/components/hambuger/Bars.vue";
  import Cross from "@/components/hambuger/Cross.vue";

  import type {Ref, TemplateRef} from "vue";

  const {size, isClicked} = defineProps<{size: number, isClicked: boolean}>();
  const rowHeight:number = 10;

  const outer:TemplateRef<HTMLElement> = useTemplateRef("outer");
  const activeClass:string = "active"
  const toggleOuterActive = () => outer.value?.classList.toggle(activeClass);

  function handleClick():void {
    toggleOuterActive();
  }

  const barClass:string[] = ["bar"];
  let bars:Bars = []

  const setBars = ():Bars => bars = Array.from(document.getElementsByClassName(barClass[0])) as Bars;

  const setElementLength = (el:Element, length:number):string => el.style.transform = `scale(${length}%)`;
  const setBarsLength = (length:number):void => bars.forEach((bar:Element) => setElementLength(bar, length));
  const removeBarTransform = ():void => setBarsLength(100);

  function addBarTransform():void {
    const length:number = bars[0].getBoundingClientRect().width;
    const modifier = 1.25;

    bars.forEach((bar:Element, index:number) => {
      const percentDifference = (index / 10) * modifier
      const percentDecimal:number = 1 - percentDifference;
      const barLength:number =  percentDecimal * 100;
      setElementLength(bar, barLength);
    })
  }

  function handleHover(state:boolean):void {
    state ? addBarTransform() : removeBarTransform();
  }

  onMounted(() => {
    setBars();
  })

  watch(() => isClicked, handleClick);

</script>

<template>
  <div
    ref="outer"
    id="hambuger-outer"
    @mouseenter="handleHover"
    @mouseleave="handleHover"
  >
    <Bars v-if="!isClicked"/>
    <Cross v-if="isClicked"/>
  </div>
</template>

<style scoped>
  #hambuger-outer {
    --icon-size: v-bind(size + "px");
    --row-height: v-bind(rowHeight + "%");
    --menu-colour: grey;

    display: grid;
    grid-template-rows: var(--row-height) var(--row-height) var(--row-height);
    border-radius: 5px;
    width: var(--icon-size);
    height: var(--icon-size);
    align-content: center;
    gap: 20%;
    padding: 5px;
  }

  #hambuger-outer.active {
    grid-template-rows: var(--row-height) var(--row-height);
    gap: 0%;
  }

  #hambuger-outer:hover{
   .top-bar {
      transform: rotateZ(45deg);
    }

    .bottom-bar {
      transform: rotateZ(-45deg);
    }
  }

</style>
