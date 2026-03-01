<script setup lang="ts">
import {type Ref, ref, watch} from "vue";

  const {btnJustify, btnVertTrans} = defineProps<{
    btnJustify: ButtonTypes,
    btnVertTrans:number,
  }>();

  type ButtonTypes = "next" | "prev";

  const transformStyle:Ref<string> = ref("");
  const size:string = "30px";
  const position:string = btnJustify === "next" ? "end" : "start";

  const setTransform = (transValue:number) => transformStyle.value = `-${transValue}px`;

  watch(() => btnVertTrans, (transValue:number) => console.log(transValue));
</script>

<template>
  <button class="carousel-button"></button>
</template>

<style scoped>
  .carousel-button{
    --y-trans: v-bind(transformStyle);
    width: v-bind('size');
    height: v-bind('size');
    border-radius: 50%;
    justify-self: v-bind('position');
    transform: translateY(var(--y-trans));
  }
</style>
