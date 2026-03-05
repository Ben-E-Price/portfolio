<script setup lang="ts">
  const {slideNum} = defineProps<{slideNum:number}>();

  const indicatorSize:string = "20px";
  const classList:string[] = ["indicator"];
</script>

<template>
  <li class="carousel-indicator">
    <button
      :slide="slideNum"
      :class="classList"
    ></button>
  </li>
</template>

<style scoped>
  .active-indicator {
    background-color: blue;
  }

  .carousel-indicator {
    margin: auto;
  }

  .indicator {
    width: v-bind('indicatorSize');
    height: v-bind('indicatorSize');
    border-radius: 50%;
  }

</style>
