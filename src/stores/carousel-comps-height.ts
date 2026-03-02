import {defineStore} from "pinia";

type CarouselComps = "carousel-outer" | "carousel-controls" | "carousel-button";
type ElementList = [string, boolean][]
interface ElementHeights {
  [key: string]: number;
}

class ElementHeight {
  private _height: number;
  private element: HTMLElement;

  constructor(
    private readonly elementName: string,
    private readonly isId: boolean
  ) {
    this.getElement().getHeight();
  }

  private getElement():this {
    this.element:HTMLElement = this.isId ? document.getElementById(this.elementName) :
      document.getElementsByClassName(this.elementName)[0];

    return this;
  }

  private getHeight():this {
    this._height = this.element.getBoundingClientRect().height;
    return this;
  }

  public height() {
    return this._height;
  }
}

class CarouselElements {
  private _heights:ElementHeights = {};

  constructor(elementData: ElementList) {
    elementData.forEach(([elementName, isId]) => {
      const key:string = elementName.split("-").slice(-1);
      const elementHeight = new ElementHeight(elementName, isId);
      this.heights[key] = elementHeight.height();
    })
  }

  public heights(){
    return this._heights;
  }
}

export default defineStore("carousel-comps-height", () => {
  const findElements: ElementList = [["carousel-outer", true], ["carousel-controls", true], ["carousel-button", false]]
  const _heightOuter:ElementHeight = new ElementHeight("carousel-outer", true);
  const _heightControls:ElementHeight = new ElementHeight("carousel-controls", true);
  const _heightButton:ElementHeight =  new ElementHeight("carousel-button", false);

})
