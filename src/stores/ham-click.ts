import {defineStore} from "pinia";
import {ref, computed} from "vue";
import {type ComputedRef, type Ref} from "vue";

export const useHamburgerClickState = defineStore("hamburger-click-state", () => {
  const isClicked: Ref<boolean> = ref(false);

  function toggleClicked():void {
    isClicked.value = !isClicked.value;
  }

  function setIsClicked(newState:boolean):void {
    isClicked.value = newState;
  }

  return {setIsClicked, toggleClicked, isClicked};
})
