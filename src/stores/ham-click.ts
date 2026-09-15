import {defineStore} from "pinia";
import {ref, computed} from "vue";
import {type ComputedRef, type Ref} from "vue";

export const useHamburgerClickState = defineStore("hamburger-click-state", () => {
  const _isClicked: Ref<boolean> = ref(false);

  function toggleClicked():void {
    _isClicked.value = !_isClicked.value;
  }

  function setIsClicked(newState:boolean):void {
    _isClicked.value = newState;
  }

  const isClicked = computed(() => _isClicked.value);

  return {setIsClicked, toggleClicked, isClicked};
})
