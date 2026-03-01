import {defineStore} from "pinia";

type CarouselComps = "carousel-outer" | "carousel-controls" | "carousel-button";

export default defineStore("carousel-comps-height", () => {
  const _heightOuter:HTMLElement | null = document.getElementById("carousel-outer");
  const _heightControls:HTMLElement | null = document.getElementById("carousel-controls");
  const _heightButton:HTMLElement | null = document.getElementsByClassName("carousel-button")[0];

  function getElementHeight(el:HTMLElement | undefined):number {
    return el.getBoundingClientRect().height
  }

  function getElement(id:boolean, elName:CarouselComps){
    const el:HTMLElement = id ? document.getElementById(elName) : document.getElementsByClassName(elName)[0]

    if(el instanceof HTMLElement){
      return el
    } else {
      console.error(`Can't find element with name ${elName}`);
    }
  }
})
