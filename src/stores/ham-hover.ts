import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const useHamburgerHoverState = defineStore("hamburger-hover-state", () => {
  const _isHovered = ref(false);

  function toggleHovered():void {
    _isHovered.value = !_isHovered.value;
  }

  const isHovered = computed(() => _isHovered.value);

  return {isHovered, toggleHovered};
})
