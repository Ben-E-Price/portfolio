import {defineStore} from "pinia";

type CarouselComps = "carousel-outer" | "carousel-controls" | "carousel-button";

class ElementHeight {
  readonly height: number;
  private element: HTMLElement;

  constructor(
    private readonly elementName: string,
    private readonly isId: boolean
  ) {}

  private getElement():this {
    this.element:HTMLElement = this.isId ? document.getElementById(this.elementName) :
      document.getElementsByClassName(this.elementName)[0];

    return this;
  }

  private getHeight():this {
    this.height = this.element.getBoundingClientRect().height;
    return this;
  }
}

export default defineStore("carousel-comps-height", () => {
  const _heightOuter:HTMLElement | null = document.getElementById("carousel-outer");
  const _heightControls:HTMLElement | null = document.getElementById("carousel-controls");
  const _heightButton:HTMLElement | null = document.getElementsByClassName("carousel-button")[0];

})
