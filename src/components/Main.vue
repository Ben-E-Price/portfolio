<script setup lang="ts">
  import data from "@/content.json"
  const {about} = JSON.parse(data)

</script>

<template>
  <main>
    <section class="content-wrapper" id="about"></section>
    <section class="content-wrapper" id="experience"></section>
    <section class="content-wrapper" id="education"></section>
    <section class="content-wrapper" id="live-examples"></section>
  </main>
</template>

<style scoped>

</style>
