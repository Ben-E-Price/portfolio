<script setup lang="ts">
  import PanelExperience from "@/components/accordion/PanelExperience.vue";
  import PanelQualification from "@/components/accordion/PanelQualification.vue";

  import type {Education, EducationData, Experience, ExperienceData} from "@/types/content.ts";
  import {onBeforeMount, type Ref, ref} from "vue";

  interface CompType {
    education: boolean;
    experience: boolean;
  }

  type CompTypeKey = keyof CompType;
  type ContentList = Experience | Education;
  type ContentData = ExperienceData | EducationData | undefined;

  const {content} = defineProps<{content: ContentList}>();

  const componentType:Ref<CompType> = ref({
    education: false,
    experience: false,
  })

  const setComponentType = (key: CompTypeKey) => componentType.value[key] = true;

  function validateExperience(data: ContentData):data is ExperienceData {
    if(data && "description" in data) return true;

    return false
  }

  function validateEducation(data: ContentData):data is EducationData {
    if(data && "qualification" in data) return true;

    return false
  }

  function findComponentType(content:ContentList) {
    const data:ContentData = content[0];

    if(validateExperience(data)){
      setComponentType("experience");
    } else if(validateEducation(data)){
      setComponentType("education");
    }
  }

  onBeforeMount(() => findComponentType(content));
</script>

<template>
  <details
    class="accordion"
    v-for="item in content"
    v-bind:key="item.year"
  >
    <summary class="accordion-sum">
      {{`${item.location} ${item.year}`}}
    </summary>

    <PanelExperience
      v-if="componentType.experience"
      :content="item.description"
    />

    <PanelQualification
      v-else-if="componentType.education"
      :content="item.qualification"
    />
  </details>
</template>

<style scoped>

</style>
