export const ARROW_INCREMENT_NONE = 'none';
export const ARROW_INCREMENT_SINGLE = 'single';
export const ARROW_INCREMENT_PAGE = 'page';

export type CarouselArrowIncrement =
  | typeof ARROW_INCREMENT_NONE
  | typeof ARROW_INCREMENT_SINGLE
  | typeof ARROW_INCREMENT_PAGE;
