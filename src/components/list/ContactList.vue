<script setup lang="ts">
  import DynamicHeading from "../heading/DynamicHeading.vue";
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
      <DynamicHeading
        :id="key"
        :text="key"
        :level="3"
      />
      <p>{{value}}</p>
    </li>
  </ul>
</template>

<style scoped>

</style>
