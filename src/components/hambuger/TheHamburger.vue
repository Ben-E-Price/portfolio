<script setup lang="ts">
  import {useTemplateRef} from "vue";
  import {useHamburgerClickState} from "@/stores/ham-click.ts";
  import {useHamburgerHoverState} from "@/stores/ham-hover.ts";

  import TheBars from "@/components/hambuger/TheBars.vue"

  import type {TemplateRef} from "vue";

  const {size} = defineProps<{size: number}>();

  const clickState = useHamburgerClickState();
  const hoverState = useHamburgerHoverState();

  const {toggleClicked} = clickState;
  const {toggleHovered, resetIsHovered} = hoverState;

  const outer:TemplateRef<HTMLElement> = useTemplateRef("outer");

  const isMouseOver = (event:MouseEvent):boolean => event.type === 'mouseover';
  const isHamburgerOuter = (event:MouseEvent):boolean => outer.value.isEqualNode(event.target);

  function handleHover(e:MouseEvent):void {
    if (isHamburgerOuter(e)) {
      isMouseOver(e) ? toggleHovered() : resetIsHovered();
    }
  }
</script>

<template>
  <div
    ref="outer"
    id="hamburger"
    @mouseover="handleHover"
    @mouseleave="handleHover"
    @click="toggleClicked"
  >
    <TheBars />
  </div>
</template>

<style scoped>
  #hamburger {
    --icon-size: v-bind(size + "px");
    --menu-colour: grey;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid black;
    width: var(--icon-size);
    height: var(--icon-size);
    position: absolute;
  }
</style>
