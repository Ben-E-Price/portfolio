<script setup lang="ts">
  import DynamicHeading from "@/components/heading/DynamicHeading.vue";

  const {locationTitle, date} = defineProps<{locationTitle: string, date: string}>();
</script>

<template>
  <div class="accordion-summery">
    <span class="sum-title">
      <DynamicHeading
        :level="3"
        :text="locationTitle"
        :class="['sum-heading']"
      />
    </span>

    <span class="sum-year">
      <p>{{date}}</p>
    </span>
  </div>
</template>

<style scoped>

</style>
