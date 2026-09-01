<script setup lang="ts">
  const {} = defineProps<{
    isVisible: Boolean,
  }>()
</script>

<template>
  <nav id="link-wrapper" v-if="isVisible">
    <a class="head-link">Link</a>
    <a class="head-link" >Link</a>
    <a class="head-link">Link</a>
    <a class="head-link">Link</a>
    <a class="head-link">Link</a>
  </nav>
</template>

<style scoped>
  #link-wrapper {
    width: 100%;
    grid-column-start: span 2;
  }

  @media (max-width: 600px) {
    #link-wrapper{
      width: 100%;
    }

    .head-link {
      display: block;
      width: 100%;
    }
  }
</style>
