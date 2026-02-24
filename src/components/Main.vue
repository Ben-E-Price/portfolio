<script setup lang="ts">
  import About from "@/components/main-sections/About.vue";
  import AccordionSection from "@/components/accordion/AccordionSection.vue";
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
  const {about, experience, education, live} = content;
</script>

<template>
  <main>
    <About :content="about" />
    <AccordionSection
      :seciton-name="`experience`"
      :content="experience"
    />

    <AccordionSection
      :seciton-name="`education`"
      :content="education"
    />

    <section class="content-wrapper" id="experience"></section>
    <section class="content-wrapper" id="education"></section>
    <section class="content-wrapper" id="live-examples"></section>
  </main>
</template>

<style scoped>

</style>
