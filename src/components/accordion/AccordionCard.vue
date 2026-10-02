<script setup lang="ts">
  import AccordionSummery from "@/components/accordion/AccordionSummery.vue";
  import AccordionBody from "@/components/accordion/AccordionBody.vue";
  import AccordionExperience from "@/components/accordion/AccordionExperience.vue";
  import AccordionQualification from "@/components/accordion/AccordionQualification.vue";

  import type {ContentList} from "@/types/accordion.ts";

  const {content} = defineProps<{content: ContentList}>();

</script>

<template>
  <details
    class="accordion-card"
    v-for="item in content"
    v-bind:key="item.year"
  >
    <AccordionSummery
      :location="item.location"
      :date="item.year"
    />

    <AccordionBody :content="item"/>
  </details>
</template>

<style scoped>

</style>
