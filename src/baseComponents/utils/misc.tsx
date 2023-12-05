export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

// :first-child can cause problems with emotion because styles tags are sometimes added before
// nodes, which can throw off :first-child selector. Not sure if this will actually be an issue
// for us, but it does create noisy warnings.
//
// This work-around mimics :first-child behavior in a way that plays nice with emotion
export const firstChildAltSelector =
  ':first-of-type:not(style):not(:first-of-type ~ *),style + *'

export enum KEY_CODES {
  ENTER = 'Enter',
  ARROW_UP = 'ArrowUp',
  ARROW_DOWN = 'ArrowDown',
  ARROW_RIGHT = 'ArrowRight',
  ARROW_LEFT = 'ArrowLeft',
  ESCAPE = 'Escape',
}

export const equals = (a: any, b: any) =>
  JSON.stringify(a) === JSON.stringify(b)

// @mui/material-icons and react-datepicker dependencies exports
// their modules as { default: Component } with is causing problems
// when included in downstream apps. This shim prevents issues by
// resolving ambiguity on how to handle the imports explicitly
export function importedDefaultComponentShim<T>(component: T): T {
  if (component && typeof component === 'object' && 'default' in component) {
    return component.default as T
  } else {
    return component
  }
}
