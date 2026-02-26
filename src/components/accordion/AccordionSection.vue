<script setup lang="ts">
  import Accordion from "@/components/accordion/Accordion.vue";
  import DynamicHeading from "../heading/DynamicHeading.vue";
  import type {Experience, Education} from "@/types/content.ts";

  type ContentLists = Experience | Education;
  const {content, sectionName} = defineProps<{content: ContentLists, sectionName: string}>();
</script>

<template>
  <section class="sec-wrapper" :id="`sec-${sectionName}`">
    <DynamicHeading
      :id="sectionName"
      :text="sectionName"
      :level="2"
    />
    <Accordion :content="content"/>
  </section>
</template>

<style scoped>

</style>
