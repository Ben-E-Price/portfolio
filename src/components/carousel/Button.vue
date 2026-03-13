<script setup lang="ts">
  import {ref, watch} from "vue";

  import type { Ref } from "vue";
  type ButtonTypes = "next" | "prev";

  const {
    vertTransform,
    btnJustify
  } = defineProps<{
    vertTransform: number
    btnJustify: ButtonTypes
  }>();

  const transformStyle:Ref<string> = ref("");
  const size:string = "30px";
  const position:string = btnJustify === "next" ? "end" : "start";

  const setTransform = () => transformStyle.value = `-${vertTransform}px`;

  watch(() => vertTransform, () => setTransform());
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
