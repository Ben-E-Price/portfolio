<script setup lang="ts">
  const {classList} = defineProps<{classList: string[]}>();
  const uniqueClass:string[] = ["cross"];
</script>

<template>
  <div :class="[...classList, ...uniqueClass]" id="cross-top"></div>
  <div :class="[...classList, ...uniqueClass]" id="cross-bottom"></div>
</template>

<style scoped>
  .cross {
    background-color: black;
    width: 95%;
    margin: 0px auto;
  }

  #cross-top {
    transform: rotateZ(45deg) translateY(50%);
  }

  #cross-bottom {
    transform: rotateZ(-45deg) translateY(-50%);
  }
</style>
