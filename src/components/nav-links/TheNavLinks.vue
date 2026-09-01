<script setup lang="ts">
  const {} = defineProps<{
    isVisible: Boolean,
    slideTime: string,
  }>()
</script>

<template>
  <Transition
    name="nav-slide"
    mode="out-in"
    appear
  >
    <nav id="link-wrapper" v-if="isVisible">
      <a class="head-link">Link</a>
      <a class="head-link" >Link</a>
      <a class="head-link">Link</a>
      <a class="head-link">Link</a>
      <a class="head-link">Link</a>
    </nav>
  </Transition>
</template>

<style scoped>
  #link-wrapper {
    width: 100%;
    grid-column-start: span 2;
  }

  .nav-slide-enter-active,
  .nav-slide-leave-active {
    transition: all var(--slide-time) ease-in-out;
  }

  .nav-slide-enter-from,
  .nav-slide-leave-to {
    transform: translateY(-100%);
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
