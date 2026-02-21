import {ref, computed, type Ref, type ComputedRef} from 'vue'
import { defineStore } from 'pinia'

export const useCompLayoutState = defineStore('comp-layout-state', () => {
  const _breakPointState:Ref = ref(0);

  const breakPointState:ComputedRef = computed(() => {
    return _breakPointState.value;
  })

  function setBreakPointState(state:number){
    _breakPointState.value = state;
  }

  function calcCurrentState(newWidth:number){
    if(newWidth <= 600){
      setBreakPointState(0);
    } else if (newWidth > 600 && newWidth <= 900){
      setBreakPointState(1);
    } else {
      setBreakPointState(2);
    }
  }

  return {calcCurrentState, breakPointState};
})
