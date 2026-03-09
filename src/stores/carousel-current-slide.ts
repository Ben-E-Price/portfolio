import {defineStore} from "pinia";
import {computed, type ComputedRef, type Ref, ref} from "vue";

export const useCurrentSlide = defineStore("current-slide", () => {
  const _currentSlide:Ref<number> = ref(0);
  const slideLimit:Ref<number> = ref(0);

  const currentSlide:ComputedRef = computed(() => {
    return _currentSlide.value;
  })

  function setSlideLimit(limit:number):void{
    slideLimit.value = limit;
  }

  function setCurrentSlide(slide:number):void{
    _currentSlide.value = slide;
  }

  function increaseSlide():void {
    _currentSlide.value < slideLimit.value - 2 ? _currentSlide.value++ : null;
  }

  function decreaseSlide():void {
    _currentSlide.value >= 0 ? _currentSlide.value-- : null;
  }

  function isClone():boolean {
    return _currentSlide.value < 0 || _currentSlide.value === slideLimit.value;
  }

  return {currentSlide, increaseSlide, decreaseSlide, setCurrentSlide, setSlideLimit, isClone};
})
