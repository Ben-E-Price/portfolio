<script setup lang="ts">
  import Accordion from "@/components/accordion/Accordion.vue";
  import type {Experience, Education} from "@/types/content.ts";

  const {content, secitonName} = defineProps<{content: Experience, secitonName: string}>();
</script>

<template>
  <section class="sec-wrapper" :id="`sec-${secitonName}`">
    <h2 :id="`heading-${secitonName}`" v-to-heading>{{secitonName}}</h2>
    <Accordion :content="content"/>
  </section>
</template>

<style scoped>

</style>
