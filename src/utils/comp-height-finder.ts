type ElementList = [string, boolean][]
interface HeightList {
  [key: string]: number;
}

class ElementHeight {
  private _height: number = 0;
  private element: HTMLElement;

  constructor(
    private readonly elementName: string,
    private readonly isId: boolean
  ) {
    this.getElement().getHeight();
  }

  private getElement():this {
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

export class ElementHeightFinder {
  private _heights:HeightList = {};

  constructor(elementData: ElementList) {
    elementData.forEach(([elementName, isId]) => {
      const key:string = elementName.split("-").slice(-1)[0] as string;
      const elementHeight = new ElementHeight(elementName, isId);
      this._heights[key] = elementHeight.height();
    })
  }

  public heights():HeightList{
    return this._heights;
  }
}

export type {ElementList, HeightList};
