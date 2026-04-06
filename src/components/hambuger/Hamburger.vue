<script setup lang="ts">
import {ref, useTemplateRef} from "vue";
  import Bars from "@/components/hambuger/Bars.vue";
  import Cross from "@/components/hambuger/Cross.vue";

  import type {Ref, TemplateRef} from "vue";

  const {size, isClicked} = defineProps<{size: number, isClicked: boolean}>();

  const outer:TemplateRef<HTMLElement> = useTemplateRef("outer")

  const hoverState:Ref<boolean> = ref(false);
  const toggleHoverState = ():boolean => hoverState.value = !hoverState.value;

  function handleHover():void {
    toggleHoverState();
  }

</script>

<template>
  <div
    ref="outer"
    id="hambuger-outer"
    @mouseenter="handleHover"
    @mouseleave="handleHover"
  >
    <Bars :is-hovered="hoverState" v-if="!isClicked"/>
    <Cross v-if="isClicked"/>
  </div>
</template>

<style scoped>
  #hambuger-outer {
    --icon-size: v-bind(size + "px");
    --menu-colour: grey;
    display: grid;
    grid-template-rows: 10% 10% 10%;
    border-radius: 5px;
    width: var(--icon-size);
    height: var(--icon-size);
    align-content: center;
    gap: 20%;
    padding: 5px;
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
