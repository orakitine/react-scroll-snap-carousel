import * as React from 'react';
import { debounce } from 'throttle-debounce';

import { BreakpointKey, getCurrentMediaQueryBreakpoint, isInBrowser } from '../../utils';

import { CarouselProps } from './carousel.types';
import { CarouselBase } from './components/carousel-base/carousel-base.component';
import { ARROW_INCREMENT_PAGE, INDICATOR_PAGES } from './types';

interface CarouselState {
  breakpoint: BreakpointKey;
}

export class Carousel extends React.Component<CarouselProps, CarouselState> {
  private onWindowSize = debounce(100, (_: Event) => {
    this.setState({
      breakpoint: getCurrentMediaQueryBreakpoint(),
    });
  });

  constructor(props: CarouselProps) {
    super(props);

    this.state = {
      breakpoint: getCurrentMediaQueryBreakpoint(),
    };
  }

  componentDidMount = () => {
    if (isInBrowser()) {
      window.addEventListener('resize', this.onWindowSize);
    }
  };

  componentWillUnmount = () => {
    if (isInBrowser()) {
      window.removeEventListener('resize', this.onWindowSize);
    }
  };

  render() {
    const {
      displayCount = 1,
      indicator = INDICATOR_PAGES,
      index = 0,
      children,
      arrowsIncrement = ARROW_INCREMENT_PAGE,
      noPadding = false,
      ...rest
    } = this.props;

    const displayCountProp = Math.max(
      typeof displayCount === 'number' ? displayCount : displayCount[this.state.breakpoint],
      1
    );
    const slidesPerPage = Math.floor(displayCountProp);

    const indicatorProp = typeof indicator === 'string' ? indicator : indicator[this.state.breakpoint];
    const arrowsIncrementProp =
      typeof arrowsIncrement === 'string' ? arrowsIncrement : arrowsIncrement[this.state.breakpoint];
    const slidesTotal = React.Children.toArray(children).length;
    const maxIndex = Math.max(slidesTotal - slidesPerPage, 0);
    const indexProp = index < 0 ? 0 : Math.min(maxIndex, index);
    const noPaddingProp = noPadding || displayCountProp === 1;

    return (
      <CarouselBase
        displayCount={displayCountProp}
        indicator={indicatorProp}
        index={indexProp}
        maxIndex={maxIndex}
        slidesTotal={slidesTotal}
        arrowIncrement={arrowsIncrementProp}
        slidesPerPage={slidesPerPage}
        noPadding={noPaddingProp}
        {...rest}
      >
        {children}
      </CarouselBase>
    );
  }
}
