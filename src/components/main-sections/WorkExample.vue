<script setup lang="ts">
import Carousel from "@/components/carousel/Carousel.vue";
  import type {LiveExample} from "@/types/content.ts";

  const {content} = defineProps<{content: LiveExample}>();
</script>

<template>
  <section id="carousel-wrapper" class="sec-wrapper">
    <h2
      :id="`heading-${content.title}`"
      v-to-heading
    >{{content.title}}</h2>

    <Carousel :content="content" />
  </section>
</template>

<style scoped>

</style>
