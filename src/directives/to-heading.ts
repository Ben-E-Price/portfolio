import {createApp, type Directive} from "vue";

export type HeadingDirective = Directive<HTMLElement>

declare module 'vue' {
  export interface GlobalDirective {
    VToHeading: HeadingDirective
  }
}

export default {
  mounted: (el) => {
    const text:string = el.innerText;
    el.classList.add(`heading`);
    el.textContent = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
} satisfies HeadingDirective
