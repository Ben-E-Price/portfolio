<script setup lang="ts">
  import AccordionExperience from "@/components/accordion/AccordionExperience.vue";
  import AccordionQualification from "@/components/accordion/AccordionQualification.vue";

  import {onBeforeMount, ref} from "vue";

  import type {Ref} from "vue";
  import type {EducationData, ExperienceData} from "@/types/content.ts";
  import type {CompType, CompTypeKey, ContentData, ContentList} from "@/types/accordion.ts";

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
    class="accordion-card"
    v-for="item in content"
    v-bind:key="item.year"
  >
    <summary class="accordion-sum">
      {{`${item.location} ${item.year}`}}
    </summary>

    <AccordionExperience
      v-if="componentType.experience"
      :content="item.description"
    />

    <AccordionQualification
      v-else-if="componentType.education"
      :content="item.qualification"
    />
  </details>
</template>

<style scoped>

</style>
