<script setup lang="ts">
  import GenericItem from "@/components/list/GenericItem.vue";

  defineProps({
    items: Array,
    listType: Number,
  })
</script>

<template>
  <ul>
    <GenericItem v-for="(cont, idx) in items" :key="idx" :content="cont" />
  </ul>
</template>

<style scoped>

</style>
