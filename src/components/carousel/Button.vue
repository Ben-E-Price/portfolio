<script setup lang="ts">
  const {btnJustify} = defineProps<{btnJustify: ButtonTypes}>();

  type ButtonTypes = "next" | "prev";
  const size:string = "30px";
  const position:string = btnJustify === "next" ? "end" : "start";
</script>

<template>
  <button class="carousel-button"></button>
</template>

<style scoped>
  .carousel-button{
    width: v-bind('size');
    height: v-bind('size');
    border-radius: 50%;
    justify-self: v-bind('position');
  }
</style>
