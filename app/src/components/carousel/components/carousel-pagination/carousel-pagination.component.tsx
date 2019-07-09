import * as React from 'react';
import { count } from '../../../../utils';

import * as styles from './carousel-pagination.css';
import { CarouselPaginationProps } from './carousel-pagination.types';

export const CarouselPagination = ({
  currentIndex,
  total,
  itemsPerPage,
  onPageClick,
  indicatorType,
  forceLast = false,
}: CarouselPaginationProps) => {
  if (indicatorType === 'pages') {
    const pageCount = Math.ceil(total / itemsPerPage);
    if (pageCount <= 1) {
      return null;
    }
    const currentPage = forceLast ? pageCount - 1 : Math.floor(currentIndex / itemsPerPage);

    const clickHandler = (pageIndex: number) => (e: React.MouseEvent) => {
      onPageClick(pageIndex);
    };

    const pageButtons = count(pageCount).map((_, i) => (
      <button
        key={i}
        tabIndex={-1}
        className={i === currentPage ? styles.carouselPageCurrent : styles.carouselPage}
        aria-hidden={true}
        onClick={clickHandler(i * itemsPerPage)}
      />
    ));
    return <div className={styles.carouselPagination}>{pageButtons}</div>;
  }

  if (indicatorType === 'number') {
    return (
      <span className={styles.carouselPaginationNumbers}>
        {currentIndex + 1}/{total}
      </span>
    );
  }

  return null;
};

CarouselPagination.displayName = 'CarouselPagination';
