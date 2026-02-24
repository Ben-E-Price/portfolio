<script setup lang="ts">
  import type {Experience} from "@/types/content.ts";

  const {content} = defineProps<{content: Experience}>();
</script>

<template>
  <section class="sec-wrapper" id="sec-experience">
    <h2 id="heading-experience" v-to-heading>Experience</h2>
  </section>
</template>

<style scoped>

</style>
