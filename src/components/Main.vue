<script setup lang="ts">
  import About from "@/components/main-sections/About.vue";
  import AccordionSection from "@/components/accordion/AccordionSection.vue";
  import WorkExample from "@/components/main-sections/WorkExample.vue";
  import {useTemplateRef} from "vue";

  import type {SiteContent} from "@/types/content.ts";
  import  type {TemplateRef} from "vue";

  import content from "@/content.json";

  const elMain:TemplateRef<HTMLElement> = useTemplateRef("main");

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

  defineExpose({elMain})
</script>

<template>
  <main ref="main">
    <About :content="about" />
    <AccordionSection
      :section-name="`experience`"
      :content="experience"
    />

    <AccordionSection
      :section-name="`education`"
      :content="education"
    />

    <WorkExample :content="liveExample" />
  </main>
</template>

<style scoped>

</style>
