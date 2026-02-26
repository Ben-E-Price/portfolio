<script setup lang="ts">
import InnerCard from "@/components/carousel/InnerCard.vue";
import Button from "@/components/carousel/Button.vue";
import IndicatorContainer from "@/components/carousel/IdicatorContainer.vue";
import type {LiveExample} from "@/types/content.ts";

const {content} = defineProps<{content: LiveExample}>();
</script>

<template>
    <div id="carousel-outer">
      <InnerCard
        :content="content"
      />
      <IndicatorContainer/>
      <Button/>
      <Button/>
    </div>
</template>

<style scoped>

</style>
