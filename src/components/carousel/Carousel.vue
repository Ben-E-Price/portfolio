<script setup lang="ts">
import InnerCard from "@/components/carousel/InnerCard.vue";
import Button from "@/components/carousel/Button.vue";
import Indicator from "@/components/carousel/Indicator.vue";
import type {LiveExample} from "@/types/content.ts";

const {content} = defineProps<{content: LiveExample}>();
</script>

<template>
    <div id="carousel-outer">
      <InnerCard />
    </div>
</template>

<style scoped>

</style>
