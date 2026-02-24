<script setup lang="ts">
  import PanelExperience from "@/components/accordion/PanelExperience.vue";
  import PanelQualification from "@/components/accordion/PanelQualification.vue";
  import type {Education, Experience} from "@/types/content.ts";
  import {type Ref, ref} from "vue";

  interface ComponentType {
    experience: boolean
    qualification: boolean
  }

  type ContentList = Experience | Education;

  const {content} = defineProps<{content: ContentList}>();

  const componentType:Ref<ComponentType> = ref({
    experience: false,
    qualification: false,
  })

  const setComponentType = (key: string) => componentType.value[key] = true;
  const getComponentType = (key: string) => componentType.value[key];

  function validateExperience(data: any):data is Experience {
    return data && "description" in data
  }

  function validateEducation(data: any):data is Education {
    return data && "qualification" in data
  }

  function findComponentType(content:ContentList) {
    const data:any = content[0];

    if(validateExperience(data)){
      setComponentType("education");
    } else if(validateEducation(data)){
      setComponentType("qualification");
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
      :v-if="getComponentType(`experience`)"
      :content="item.description"
    />

    <PanelQualification
      :v-if="getComponentType(`qualification`)"
      :content="item.qualification"
    />
  </details>
</template>

<style scoped>

</style>
