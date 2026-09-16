<script setup lang="ts">
  import {ref, useTemplateRef, watch} from "vue";
  import {useHamburgerClickState} from "@/stores/ham-click.ts";
  import {useHamburgerHoverState} from "@/stores/ham-hover.ts";

  import TheBars from "@/components/hambuger/TheBars.vue"

  import type {TemplateRef, Ref} from "vue";
  import type {ChildEls} from "@/types/hamburger.ts";

  const {size, isClicked} = defineProps<{size: number, isClicked: boolean}>();
  const rowHeight:number = 10;

  const clickState = useHamburgerClickState();
  const hoverState = useHamburgerHoverState();

  const {toggleClicked} = clickState;
  const {toggleHovered, resetIsHovered} = hoverState;

  const outer:TemplateRef<HTMLElement> = useTemplateRef("outer");
  const activeClass:string = "active"
  const toggleOuterActive = () => outer.value?.classList.toggle(activeClass);

  function handleClick():void {
    toggleOuterActive();
  }

  const barClass:string[] = ["bar"];
  const _children:Ref<ChildEls> = ref(null);

  const setChildren = (elements:ChildEls):ChildEls => _children.value = elements;
  const getChildren = ():ChildEls => setChildren(Array.from(outer.value?.children));
  const children = ():ChildEls => _children.value;

  const setElementLength = (el:Element, length:number):string => el.style.width = `${length}%`;
  const setChildrenLength = (length:number):void => children().forEach((bar:Element) => setElementLength(bar, length));
  const removeBarTransform = ():void => setChildrenLength(100);

  function handleSeqTransform():void {
    const length:number = children()[0].getBoundingClientRect().width;
    const modifier = 1.25;

    children().forEach((bar:Element, index:number) => {
      const percentDifference = (index / 10) * modifier
      const percentDecimal:number = 1 - percentDifference;
      const barLength:number =  percentDecimal * 100;
      setElementLength(bar, barLength);
    })
  }

  function transformCross():void {
    setChildrenLength(90);
  }

  function handleChildEvents():void {
    isClicked ? transformCross() : handleSeqTransform();
  }

  const hoverType = (e:MouseEvent):boolean => e.type === 'mouseover';

  function handleHover(e:MouseEvent):void {
    hoverType(e) ? hamburgerStatus.setIsHovered(true) : hamburgerStatus.setIsHovered(false);
  }

  watch(() => isClicked, handleClick);

</script>

<template>
  <div
    ref="outer"
    id="hambuger-outer"
    @mouseover="toggleHovered"
    @mouseleave="resetIsHovered"
    @click="toggleClicked"
  >

    <TheBars />
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
    border: 1px solid black;
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
