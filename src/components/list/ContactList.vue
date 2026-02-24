<script setup lang="ts">
  import type {ContactData} from "@/types/content.ts";
  const {items} =  defineProps<{items: ContactData}>();
</script>

<template>
  <ul>
    <li
      v-for="(value, key) in items"
      v-bind:key="`contact-${key}`"
      class="dis-flex"
    >
      <h3 v-to-heading>{{key}}</h3>
      <p>{{value}}</p>
    </li>
  </ul>
</template>

<style scoped>

</style>
