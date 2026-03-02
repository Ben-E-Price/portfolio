import {defineStore} from "pinia";

type CarouselComps = "carousel-outer" | "carousel-controls" | "carousel-button";

export const useCarouselHeights = defineStore("carousel-comps-height", () => {
  const findElements: ElementList = [["carousel-outer", true], ["carousel-controls", true], ["carousel-button", false]]
  const test = new CarouselElements(findElements);
  const _heightOuter:ElementHeight = new ElementHeight("carousel-outer", true);
  const _heightControls:ElementHeight = new ElementHeight("carousel-controls", true);
  const _heightButton:ElementHeight =  new ElementHeight("carousel-button", false);

  return {test}
})
