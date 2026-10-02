<script setup lang="ts">
  import About from "@/components/main-sections/About.vue";
  import TheAccordion from "@/components/accordion/TheAccordion.vue";
  import WorkExample from "@/components/main-sections/WorkExample.vue";

  import type {SiteContent} from "@/types/content.ts";

  import content from "@/content.json";

  function validateSiteContent(content: any): content is SiteContent {
    return (
      "about" in content &&
        "experience" in content &&
        "education" in content &&
        "live" in content
    )
  }

  validateSiteContent(content)
  const {about, experience, education, liveExample} = content;
</script>

<template>
  <main>
    <About :content="about"/>
    <TheAccordion
      :section-name="`experience`"
      :content="experience"
    />

    <TheAccordion
      :section-name="`education`"
      :content="education"
    />

    <WorkExample :content="liveExample" />
  </main>
</template>

<style scoped>
</style>
