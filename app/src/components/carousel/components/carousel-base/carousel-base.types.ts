import { CarouselArrowIncrement, CarouselIndicator, CarouselProps } from '../../index';

export interface CarouselBaseProps extends CarouselProps {
  arrowIncrement: CarouselArrowIncrement;
  displayCount: number;
  indicator: CarouselIndicator;
  slidesTotal: number;
  index: number;
  maxIndex: number;
  slidesPerPage: number;
  noPadding: boolean;
}
