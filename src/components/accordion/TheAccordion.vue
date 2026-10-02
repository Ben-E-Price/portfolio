<script setup lang="ts">
  import AccordionCard from "@/components/accordion/AccordionCard.vue";
  import DynamicHeading from "../heading/DynamicHeading.vue";

  import type {ContentList} from "@/types/accordion.ts";

  const {content, sectionName} = defineProps<{content: ContentList, sectionName: string}>();
</script>

<template>
  <section :class="['sec-wrapper', 'accordion-wrapper']" :id="`sec-${sectionName}`">
    <DynamicHeading
      :id="sectionName"
      :text="sectionName"
      :level="2"
    />
    <AccordionCard :content="content"/>
  </section>
</template>

<style scoped>

</style>
