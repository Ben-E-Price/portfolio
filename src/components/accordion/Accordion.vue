<script setup lang="ts">
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
    <p>{{item.description}}</p>
  </details>
</template>

<style scoped>

</style>
