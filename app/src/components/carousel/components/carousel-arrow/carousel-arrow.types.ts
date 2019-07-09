export const ARROW_DIRECTION_PREV = 'prev';
export const ARROW_DIRECTION_NEXT = 'next';

export type CarouselArrowDirection = typeof ARROW_DIRECTION_PREV | typeof ARROW_DIRECTION_NEXT;

export interface CarouselArrowProps {
  direction: CarouselArrowDirection;
  onClick: (direction: CarouselArrowDirection) => void;
  topOffset?: number;
}
