<script setup lang="ts">
  import type {Qualification} from "@/types/content.ts";

  const {content} = defineProps<{content:Qualification}>();
  const {title, grade} = content;
</script>

<template>
  <div class="accordion-panel">
    <p class="qual-title">{{ title }}</p>
    <p class="qual-grade">{{ grade }}</p>
  </div>
</template>

<style scoped>

</style>
