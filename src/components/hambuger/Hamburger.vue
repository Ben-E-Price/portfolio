<script setup lang="ts">

  const {size} = defineProps<{size: number}>();
  const barClass:string[] = ["bar"];
</script>

<template>
  <div id="hambuger-outer">
    <span :class="barClass"></span>
    <span :class="barClass"></span>
    <span :class="barClass"></span>
  </div>
</template>

<style scoped>
  #hambuger-outer {
    --icon-size: v-bind(size + "px");
    --menu-colour: grey;
    display: grid;
    grid-template-rows: 10% 10% 10%;
    border: black solid 1px;
    border-radius: 5px;
    width: var(--icon-size);
    height: var(--icon-size);
    align-content: center;
    gap: 20%;
    padding: 5px;
  }

  .bar {
    border-radius: 10px;
    width: 100%;
    background-color: black;
  }
</style>
