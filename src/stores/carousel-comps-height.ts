import {defineStore, type StoreDefinition} from "pinia";
import {ElementHeightFinder, type ElementList, type HeightList} from "@/utils/comp-height-finder.ts";
import {computed, type ComputedRef, ref, type Ref} from "vue";

const elementList: ElementList = [
  ["carousel-outer", true],
  ["carousel-controls", true],
  ["carousel-button", false]
];

export const useCarouselHeights = defineStore("carousel-comps-height", () => {
  const _heightOuter:Ref<number> = ref(0)
  const _heightControls:Ref<number> = ref(0)
  const _heightButton:Ref<number> = ref(0);

  const heightOuter:ComputedRef<number> = computed(() => {
    return _heightOuter.value;
  })

  const heightControls:ComputedRef<number> = computed(() => {
    return _heightControls.value;
  })

  const heightButton:ComputedRef<number> = computed(() => {
    return _heightButton.value;
  })

  function isNumber(check:any):boolean {
    return typeof check === "number"
  }

  function areNumbers(object:HeightList):boolean {
    return Object.values(object).every((value):boolean => isNumber(value))
  }

  function setHeights():void {
    const elementHeights:HeightList = new ElementHeightFinder(elementList).heights()
    if(areNumbers(elementHeights)){
      const {outer, controls, button} = elementHeights;
      _heightOuter.value = outer;
      _heightControls.value = controls;
      _heightButton.value = button;
    }
  }

  return {setHeights, heightOuter, heightControls, heightButton};
})
