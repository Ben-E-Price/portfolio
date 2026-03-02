import {defineStore, type StoreDefinition} from "pinia";
import {ElementHeightFinder, type ElementList, type HeightList} from "@/utils/comp-height-finder.ts";
import {ref, type Ref} from "vue";

export const useCarouselHeights:StoreDefinition<"carousel-comps-height"> = defineStore("carousel-comps-height", () => {
  const elementList: ElementList = [
    ["carousel-outer", true],
    ["carousel-controls", true],
    ["carousel-button", false]
  ];

  const _heightOuter:Ref<number> = ref(0)
  const _heightControls:Ref<number> = ref(0)
  const _heightButton:Ref<number> = ref(0);

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

  return {setHeights};
})
