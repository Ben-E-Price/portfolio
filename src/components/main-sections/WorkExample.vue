<script setup lang="ts">
  import Carousel from "@/components/carousel/Carousel.vue";
  import DynamicHeading from "../heading/DynamicHeading.vue";

  import type {LiveExample} from "@/types/content.ts";

  const {content} = defineProps<{content: LiveExample}>();
  const classList:string[] = ["content-wrapper"]
  const title:string = "Live Examples";
</script>

<template>
  <section id="live-examples" :class="classList">
    <DynamicHeading
      :id="title"
      :text="title"
      :level="2"
    />
    <Carousel :content="content" />
  </section>
</template>

<style scoped>

</style>
