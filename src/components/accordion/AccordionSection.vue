<script setup lang="ts">
  import Accordion from "@/components/accordion/Accordion.vue";
  import type {Experience, Education} from "@/types/content.ts";

  type ContentLists = Experience | Education;
  const {content, sectionName} = defineProps<{content: ContentLists, sectionName: string}>();
</script>

<template>
  <section class="sec-wrapper" :id="`sec-${sectionName}`">
    <h2 :id="`heading-${sectionName}`" v-to-heading>{{ sectionName }}</h2>
    <Accordion :content="content"/>
  </section>
</template>

<style scoped>

</style>
