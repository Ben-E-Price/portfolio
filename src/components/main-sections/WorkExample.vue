<script setup lang="ts">
import Carousel from "@/components/carousel/Carousel.vue";
  import type {LiveExample} from "@/types/content.ts";

  const {content} = defineProps<{content: LiveExample}>();
  const classList:string[] = ["content-wrapper"]
  const title:string = "work-example";
</script>

<template>
  <section id="live-examples" :class="classList">
    <h2
      :id="`heading-${title}`"
      v-to-heading
    >{{title}}</h2>

    <Carousel :content="content" />
  </section>
</template>

<style scoped>

</style>
