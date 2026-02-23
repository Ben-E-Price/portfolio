<script setup lang="ts">
  import List from "@/components/list/List.vue";

  import pageContent from "@/content.json"
  import type {SiteContent, About} from "@/types/content.ts";
  const {about} = pageContent as SiteContent

  function aboutValid(data: any): data is About {
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

  aboutValid(about);
  const id:string[] = Object.keys(about)
  const headings:string[] = id.map((head:string) => upperCaseHeading(head));
</script>

<template>
  <section class="content-wrapper">
    <div id="about">
      <h2 id="about">{{headings[0]}}</h2>
      <p>{{about.about}}</p>
    </div>

    <span>
      <h2 id="skills">{{headings[1]}}</h2>
      <List :items="about.skills" />
    </span>
  </section>
</template>

<style scoped>

</style>
