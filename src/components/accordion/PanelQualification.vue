<script setup lang="ts">
  import type {Qualification} from "@/types/content.ts";

  const {content} = defineProps<{content:Qualification[]}>();
  const classList:string[] = ["accordion-panel", "qual-panel"];
</script>

<template>
  <div
    :class="classList"
    v-for="{title, grade} in content"
  >
    <p class="qual-title">{{ title }}</p>
    <p class="qual-grade">{{ grade }}</p>
  </div>
</template>

<style scoped>

</style>
