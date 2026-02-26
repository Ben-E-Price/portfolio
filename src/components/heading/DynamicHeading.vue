<script setup lang="ts">
  import { defineComponent, h, type PropType } from 'vue'

  type HeadingValues = 1 | 2 | 3 | 4 | 5 | 6;
  type HTMLKeys = keyof HTMLElementTagNameMap;

  const DynamicHeading = defineComponent({
    props: {
      level: {
        required: true,
        type: Number as PropType<HeadingValues>
      },

      id: String,
      text: String as PropType<HTMLKeys>,
    },

    render(props) {
      return h(`h${props.level}`, {id: `heading-${props.id}`}, props.text)
    }
  })
</script>

<template>
  <component :is="DynamicHeading" v-to-heading/>
</template>

<style scoped>

</style>
