<script setup lang="ts">
  import PanelExperience from "@/components/accordion/PanelExperience.vue";
  import PanelQualification from "@/components/accordion/PanelQualification.vue";
  import {computed} from "vue";
  import type {EducationData, ExperienceData} from "@/types/content.ts";


  const {content} = defineProps<{content: ExperienceData | EducationData}>();

  const isExperience = computed(() => "description" in content)
  const isEducation = computed(() => "qualification" in content)
</script>

<template>
  <PanelExperience
    v-if="isExperience"
    :content="content.description"
  />

  <PanelQualification
    v-if="isEducation"
    :content="content.qualification"
  />
</template>

<style scoped>

</style>
