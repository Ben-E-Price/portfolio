<script setup lang="ts">
  import AccordionExperience from "@/components/accordion/AccordionExperience.vue";
  import AccordionQualification from "@/components/accordion/AccordionQualification.vue";
  import {computed} from "vue";
  import type {EducationData, ExperienceData} from "@/types/content.ts";


  const {content} = defineProps<{content: ExperienceData | EducationData}>();

  const isExperience = computed(() => "description" in content)
  const isEducation = computed(() => "qualification" in content)
</script>

<template>
  <AccordionExperience
    v-if="isExperience"
    :content="content.description"
  />

  <AccordionQualification
    v-if="isEducation"
    :content="content.qualification"
  />
</template>

<style scoped>

</style>
