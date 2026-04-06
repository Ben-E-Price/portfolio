<script setup lang="ts">

</script>

<template>
  <div class="bar-cross" id="cross-top"></div>
  <div class="bar-cross" id="cross-bottom"></div>
</template>

<style scoped>
  .bar-cross {
    background-color: black;
    width: 100%;
  }

  #cross-top {
    transform: rotateZ(45deg) translateY(50%);
  }

  #cross-bottom {
    transform: rotateZ(-45deg) translateY(-50%);
  }
</style>
