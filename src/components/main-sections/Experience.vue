<script setup lang="ts">
  import Accordion from "@/components/accordion/Accordion.vue";
  import type {Experience} from "@/types/content.ts";

  const {content} = defineProps<{content: Experience}>();
</script>

<template>
  <section class="sec-wrapper" id="sec-experience">
    <h2 id="heading-experience" v-to-heading>Experience</h2>
    <Accordion :content="content"/>
  </section>
</template>

<style scoped>

</style>
