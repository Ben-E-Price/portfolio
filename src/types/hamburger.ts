type ChildEls = Element[];

interface HamburgerElements {
  wrapper: HTMLElement,
  bar: HTMLElement,
}

interface GetBoundingClient {
  top:number;
  height:number;
}

export type { ChildEls, HamburgerElements, GetBoundingClient };
