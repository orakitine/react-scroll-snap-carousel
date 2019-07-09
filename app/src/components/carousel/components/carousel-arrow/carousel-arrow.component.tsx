import * as React from 'react';
import { joinClasses } from '../../../../utils';

import { Icon, IconProps } from '../../../icon';

import * as styles from './carousel-arrow.css';
import {
  ARROW_DIRECTION_NEXT,
  ARROW_DIRECTION_PREV,
  CarouselArrowDirection,
  CarouselArrowProps,
} from './carousel-arrow.types';

export const CarouselArrow = ({ direction, onClick, topOffset }: CarouselArrowProps) => {
  const arrowStyles: { [key in CarouselArrowDirection]: string } = {
    [ARROW_DIRECTION_NEXT]: joinClasses(styles.carouselArrow, styles.carouselArrowRight),
    [ARROW_DIRECTION_PREV]: joinClasses(styles.carouselArrow, styles.carouselArrowLeft),
  };
  const arrowIcon: { [key in CarouselArrowDirection]: IconProps['name'] } = {
    [ARROW_DIRECTION_NEXT]: 'chevron-right',
    [ARROW_DIRECTION_PREV]: 'chevron-left',
  };
  const offsetStyles = topOffset !== undefined ? { top: topOffset + 'px' } : undefined;

  const handleClick = (_: React.MouseEvent) => {
    onClick(direction);
  };

  return (
    <button
      tabIndex={-1}
      aria-hidden={true}
      className={arrowStyles[direction]}
      onClick={handleClick}
      style={offsetStyles}
    >
      <Icon name={arrowIcon[direction]} />
    </button>
  );
};

CarouselArrow.displayName = 'CarouselArrow';
