<script setup lang="ts">
import {type Ref, ref} from "vue";

  const navLinkToggle:Ref = ref(false);

  function toggleNavLinks():void {
    navLinkToggle.value = !navLinkToggle.value;
  }

  window.onresize = (e:Event) => {
    if(navLinkToggle.value === false && window.innerWidth > 600){
      navLinkToggle.value = true;
    } else if (navLinkToggle.value === true && window.innerWidth < 600){
      navLinkToggle.value = false;
    }
  }
</script>

<template>
  <header>
    <span id="menu-icon-wrapper" @click="toggleNavLinks">

    </span>
    <span id="heading-wrapper">
      <h1>Heading</h1>
    </span>
    <nav id="link-wrapper" v-if="navLinkToggle">
      <a class="head-link" >Link</a>
      <a class="head-link">Link</a>
      <a class="head-link">Link</a>
      <a class="head-link">Link</a>
      <a class="head-link">Link</a>
    </nav>
  </header>
</template>

<style scoped>
  header {
    width: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
  }

  #heading-wrapper {
    display: flex;
    justify-content: center;
  }

  #menu-icon-wrapper {
    display: none;
    border: solid 1px black;
  }

  #link-wrapper {
    width: 100%;
    grid-column-start: span 2;
  }

  @media (max-width: 600px) {
    header {
      grid-template-columns: 25vw auto;
    }

    #link-wrapper{
      width: 100%;
      background: blue;
    }

    .head-link {
      display: block;
      width: 100%;
    }

    #menu-icon-wrapper{
      display: block;
    }
  }
</style>
