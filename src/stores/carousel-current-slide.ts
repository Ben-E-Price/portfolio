import {defineStore} from "pinia";
import {computed, type ComputedRef, type Ref, ref} from "vue";

export const useCurrentSlide = defineStore("current-slide", () => {
  const _activeSlide:Ref<number> = ref(0);
  const slideLimit:Ref<number> = ref(0);

  const activeSlide:ComputedRef = computed(() => {
    return _activeSlide.value;
  })

  function setSlideLimit(limit:number):void{
    slideLimit.value = limit;
  }

  function setCurrentSlide(slide:number):void{
    _activeSlide.value = slide;
  }

  function increaseSlide():void {
    _activeSlide.value < slideLimit.value - 2 ? _activeSlide.value++ : null;
  }

  function decreaseSlide():void {
    _activeSlide.value >= 0 ? _activeSlide.value-- : null;
  }

  function isClone():boolean {
    return _activeSlide.value < 0 || _activeSlide.value === slideLimit.value - 2;
  }

  return {activeSlide, increaseSlide, decreaseSlide, setCurrentSlide, setSlideLimit, isClone};
})
