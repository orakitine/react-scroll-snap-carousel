import { CarouselIndicator } from '../../types';

export interface CarouselPaginationProps {
  currentIndex: number;
  total: number;
  itemsPerPage: number;
  indicatorType: CarouselIndicator;
  onPageClick: (pageIndex: number) => void;
  forceLast: boolean;
}
