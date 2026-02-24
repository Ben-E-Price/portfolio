<script setup lang="ts">
import type {Qualification} from "@/types/content.ts";

const {content: {title, grade}} = defineProps<{content:Qualification}>();
</script>

<template>
  <div class="accordion-panel">
    <p class="qual-title">{{ title }}</p>
    <p class="qual-grade">{{ grade }}</p>
  </div>
</template>

<style scoped>

</style>
