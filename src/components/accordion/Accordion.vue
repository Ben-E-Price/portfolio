<script setup lang="ts">
  import PanelExperience from "@/components/accordion/PanelExperience.vue";
  import PanelQualification from "@/components/accordion/PanelQualification.vue";
  import type {Education, Experience} from "@/types/content.ts";

  const {content} = defineProps<{content: Experience | Education}>();
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
    <PanelExperience :content="item.description" />
  </details>
</template>

<style scoped>

</style>
