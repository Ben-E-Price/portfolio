<script setup lang="ts">
  import List from "@/components/list/List.vue";
  import type {AboutData} from "@/types/content.ts";

  const {content} = defineProps<{content: AboutData}>();
  const {about, skills, contact} = content
  function validateAbout(data: any): data is AboutData {
    return (
      data &&
        typeof data === "object" &&
        "about" in data &&
        typeof data.about === "string" &&
        "skills" in data &&
        typeof data.skills === "object" &&
        "contact" in data &&
        typeof data.contact === "object"
    )
  }

  validateAbout(content);
  const [idAbout, idSkills, idContact]:string[] = Object.keys(content);
</script>

<template>
  <section class="content-wrapper">
    <div id="about">
      <h2
        :id="`heading-${idAbout}`"
        v-to-heading>
        {{idAbout}}
      </h2>
      <p>{{about}}</p>
    </div>

    <span>
      <h2
        :id="`heading-${idSkills}`"
        v-to-heading>
        {{idSkills}}
      </h2>
      <List :items="skills" />
    </span>

    <span>
      <h2 :id="`heading-${idContact}`"
          v-to-heading>
        {{idContact}}
      </h2>
    </span>
  </section>
</template>

<style scoped>

</style>
