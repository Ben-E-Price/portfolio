<script setup lang="ts">
  import {watch, ref} from "vue";
  import type {Ref} from "vue";

  const {isHovered} = defineProps<{isHovered: boolean}>();
  const classList:Ref<string[]> = ref(["bar-cross"])

  watch(() => isHovered, () => {})
</script>

<template>
  <div :class="classList" id="cross-top"></div>
  <div :class="classList" id="cross-bottom"></div>
</template>

<style scoped>
  .bar-cross {
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
