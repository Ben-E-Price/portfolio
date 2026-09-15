import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const useHamburgerHoverState = defineStore("hamburger-hover-state", () => {
  const isHovered = ref(false);

  function toggleHovered():void {
    isHovered.value = !isHovered.value;
  }

  function $reset():void {
    isHovered.value = false;
  }

  return {isHovered, toggleHovered};
})
