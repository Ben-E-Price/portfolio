<script setup lang="ts">
  import List from "@/components/list/List.vue";
  import ContactList from "@/components/list/ContactList.vue";
  import DynamicHeading from "../heading/DynamicHeading.vue";

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
  <section class="sec-wrapper" id="sec-about">
    <div id="about">
      <DynamicHeading
        :id="idAbout"
        :text="idAbout"
        :level="2"
      />
      <p>{{about}}</p>
    </div>

    <span>
      <DynamicHeading
        :id="idSkills"
        :text="idSkills"
        :level="2"
      />
      <List :items="skills" />
    </span>

    <span>
      <DynamicHeading
        :id="idContact"
        :text="idContact"
        :level="2"
      />
      <ContactList :items="contact" />
    </span>
  </section>
</template>

<style scoped>

</style>
