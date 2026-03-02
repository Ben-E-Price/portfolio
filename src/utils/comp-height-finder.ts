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
    console.log(document.getElementById(this.elementName));
    this.element = this.isId ? document.getElementById(this.elementName) :
      document.getElementsByClassName(this.elementName)[0];

    return this;
  }

  private getHeight():this {
    this._height = this.element.getBoundingClientRect().height;
    return this;
  }

  public height():number {
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
