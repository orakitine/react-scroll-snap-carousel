import * as React from 'react';
import { isOfType } from '../../../../utils';

import * as styles from './carousel-slides.css';
import { CarouselSlidesProps } from './carousel-slides.types';
const MIN_LIMIT = 5;

export const CarouselSlides = ({
  children,
  displayCount,
  currentIndex,
  placeholder,
  noPadding,
  slideWidth,
}: CarouselSlidesProps) => {
  const validChildren = React.Children.toArray(children);
  const limit = placeholder ? Math.max(MIN_LIMIT, Math.ceil(displayCount) * 2) : -1;
  const lowerBound = limit >= 0 ? currentIndex - limit : 0;
  const upperBound = limit >= 0 ? currentIndex + Math.ceil(displayCount) + limit : validChildren.length;
  const slideStyle = { width: slideWidth + 'px' };

  const slides = validChildren.map((child: React.ReactNode, index) => {
    const key = isOfType<typeof child, React.ReactElement>(child, 'key') && child.key;
    return (
      <li
        key={key || index}
        style={slideStyle}
        className={noPadding ? styles.carouselSlide : styles.carouselSlidePadded}
      >
        <div className={styles.carouselSlideContainer}>
          {index >= lowerBound && index <= upperBound ? child : placeholder}
        </div>
      </li>
    );
  });

  return <>{slides}</>;
};

CarouselSlides.displayName = 'CarouselSlides';
