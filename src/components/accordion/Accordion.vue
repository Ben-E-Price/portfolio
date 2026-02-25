<script setup lang="ts">
  import PanelExperience from "@/components/accordion/PanelExperience.vue";
  import PanelQualification from "@/components/accordion/PanelQualification.vue";
  import type {Education, EducationData, Experience, ExperienceData} from "@/types/content.ts";
  import {type Ref, ref} from "vue";

  interface CompType {
    education: boolean;
    experience: boolean;
  }

  type CompTypeKey = keyof CompType;
  type ContentList = Experience | Education;

  const {content} = defineProps<{content: ContentList}>();

  const componentType:Ref<CompType> = ref({
    education: false,
    experience: false,
  })

  const setComponentType = (key: CompTypeKey) => componentType.value[key] = true;
  const checkCompType = (compareKey:CompTypeKey):boolean => componentType.value[compareKey];

  function validateExperience(data: any):data is ExperienceData {
    return data && "description" in data
  }

  function validateEducation(data: any):data is EducationData {
    return data && "qualification" in data
  }

  function findComponentType(content:ContentList) {
    const data:any = content[0];

    if(validateExperience(data)){
      setComponentType("experience");
    } else if(validateEducation(data)){
      setComponentType("education");
    }
  }

  findComponentType(content);
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
      v-if="checkCompType(`experience`)"
      :content="item.description"
    />

    <PanelQualification
      v-if="checkCompType(`education`)"
      :content="item.qualification"
    />
  </details>
</template>

<style scoped>

</style>
