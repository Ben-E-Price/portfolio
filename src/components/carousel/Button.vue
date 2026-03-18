<script setup lang="ts">
import {ref, watch} from "vue";

  import type { Ref } from "vue";
  type ButtonTypes = "next" | "prev";

  const {
    id,
    transformY,
    btnJustify
  } = defineProps<{
    transformY: number
    btnJustify: ButtonTypes
    id: string
  }>();

  const classList:string[] = ["carousel-button"];
  const size:string = "30px";
  const position:string = btnJustify === "next" ? "end" : "start";

  const transStyleY:Ref<string> = ref("");

  const transformStyle = (transValue:number, style:Ref<string>):string => style.value = `${transValue}px`;

  watch(() => transformY, () => transformStyle(transformY, transStyleY));
</script>

<template>
  <button
    :id="id"
    :class="classList"
  ></button>
</template>

<style scoped>
  .carousel-button {
    --y-trans: v-bind(transStyleY);
    translate: 0 var(--y-trans);
    width: v-bind('size');
    height: v-bind('size');
    border-radius: 50%;
    justify-self: v-bind('position');
    margin: 5px;
  }
</style>
