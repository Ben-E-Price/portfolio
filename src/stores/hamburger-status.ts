import {defineStore} from "pinia";
import {ref, computed} from "vue";
import {type ComputedRef, type Ref} from "vue";

export const useHamburgerStatus = defineStore("hamburger-status", () => {
  const _isClicked: Ref<boolean> = ref(false);
  const _isHovered: Ref<boolean> = ref(false);

  function toggleClicked():void {
    _isClicked.value = !_isClicked.value;
  }

  function setIsHovered(value:boolean):void {
    console.log("setIsHovered", value);
    _isHovered.value = value;
  }

  const crossStatus:ComputedRef<boolean> = computed(() => _isClicked.value || _isHovered.value);

  return {toggleClicked, setIsHovered, crossStatus};
})
