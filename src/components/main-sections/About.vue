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

  function upperCaseHeading(word: string):string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  validateAbout(content);
  const id:string[] = Object.keys(content);
  const headings:string[] = id.map((head:string) => upperCaseHeading(head));
</script>

<template>
  <section class="content-wrapper">
    <div id="about">
      <h2 id="about" v-to-heading>{{id[0]}}</h2>
      <p>{{content.about}}</p>
    </div>

    <span>
      <h2 id="skills" v-to-heading>{{id[1]}}</h2>
      <List :items="content.skills" />
    </span>
  </section>
</template>

<style scoped>

</style>
