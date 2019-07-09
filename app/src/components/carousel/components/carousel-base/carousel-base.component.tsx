import * as React from "react";
import Measure from "react-measure";
import { debounce } from "throttle-debounce";

import { isInBrowser } from "../../../../utils";
import {
  ARROW_INCREMENT_NONE,
  ARROW_INCREMENT_PAGE,
  ARROW_INCREMENT_SINGLE,
  CarouselArrowIncrement
} from "../../types";
import { getElementVerticalCenterInParent } from "../../utils/element-vertical-centerIn-parent";
import { CarouselArrow } from "../carousel-arrow/carousel-arrow.component";
import {
  ARROW_DIRECTION_NEXT,
  ARROW_DIRECTION_PREV,
  CarouselArrowDirection
} from "../carousel-arrow/carousel-arrow.types";
import { CarouselPagination } from "../carousel-pagination/carousel-pagination.component";
import { CarouselSlides } from "../carousel-slides/carousel-slides.component";

import * as styles from "./carousel-base.css";
import { CarouselBaseProps } from "./carousel-base.types";

interface CarouselBaseState {
  index: number;
  arrowOffset?: number;
  slideWidth: number;
}
const SCROLL_JITTER = 1;
const RE_SCROLL_ATTEMPTS = 2;

export class CarouselBase extends React.Component<CarouselBaseProps, CarouselBaseState> {
  private frameRef = React.createRef<HTMLUListElement>();
  private lastElementRef = React.createRef<HTMLDivElement>();
  private isTouching = false;
  private scrollLeft = 0;
  private frameWidth = 0;
  private isMaxScroll = false;
  private userRequestedIndex: number | undefined;
  private reScrollAttempts = 0;

  constructor(props: CarouselBaseProps) {
    super(props);
    this.state = {
      index: this.props.index,
      slideWidth: 0
    };
  }

  componentDidMount = () => {
    if (isInBrowser()) {
      document.addEventListener("focus", this.handleDocumentFocus, true);
    }
  };

  componentDidUpdate = (prevProps: CarouselBaseProps) => {
    if (prevProps.arrowPositionSelector !== this.props.arrowPositionSelector) {
      this.updateArrowOffset();
    }
    if (prevProps.index !== this.props.index) {
      this.scrollToIndex(this.props.index, false);
    }
    if (
      this.props.slidesTotal !== prevProps.slidesTotal ||
      this.props.displayCount !== prevProps.displayCount
    ) {
      this.onResize();
    }
  };

  componentWillUnmount = () => {
    if (isInBrowser()) {
      document.removeEventListener("focus", this.handleDocumentFocus, true);
    }
  };

  updateScrollValues = () => {
    const frameElement = this.frameRef.current;
    this.scrollLeft = frameElement ? frameElement.scrollLeft : 0;
    const frameScrollWidth = frameElement ? frameElement.scrollWidth : 0;
    this.isMaxScroll =
      Math.abs(frameScrollWidth - this.frameWidth - this.scrollLeft) < SCROLL_JITTER;
  };

  updateArrowOffset = () => {
    const frameElement = this.frameRef.current;
    let offset: number | undefined;
    if (frameElement && this.props.arrowPositionSelector) {
      const element = frameElement.querySelector(this.props.arrowPositionSelector);
      if (element) {
        offset = getElementVerticalCenterInParent(element, frameElement);
      }
    }
    if (offset !== this.state.arrowOffset) {
      this.setState({ arrowOffset: offset });
    }
  };

  scrollToIndex = (index: number, instant = false) => {
    const left = this.state.slideWidth * index;
    if (Math.abs(this.scrollLeft - left) < SCROLL_JITTER) {
      // Already there.
      if (this.state.index !== index) {
        this.onIndexChange(index);
      }
      return;
    }

    const element = this.frameRef.current as HTMLElement;
    if (!element) {
      return;
    }

    if (element.scrollTo && !instant) {
      element.scrollTo({
        behavior: "smooth",
        left
      });
    } else {
      element.scrollLeft = left;
    }
  };

  handleOnScroll = (_: React.UIEvent<HTMLUListElement>) => {
    this.updateScrollValues();
    if (this.isTouching) {
      return;
    }
    const index = this.isMaxScroll
      ? this.props.maxIndex
      : Math.round(this.scrollLeft / this.state.slideWidth);
    const isSnapped = Math.abs(index * this.state.slideWidth - this.scrollLeft) < SCROLL_JITTER;

    if (!this.isMaxScroll && !isSnapped && this.reScrollAttempts <= RE_SCROLL_ATTEMPTS) {
      /* For the browsers that do not support scroll snapping we need to manually run scroll to closest index, and hope it will get there */
      this.reScrollAttempts++;
      this.scrollToIndex(index);
    } else {
      this.reScrollAttempts = 0;
      if (index === this.userRequestedIndex) {
        this.onIndexChange(index);
        this.userRequestedIndex = undefined;
      } else if (this.state.index !== index) {
        this.onIndexChange(index);
      }
    }
  };

  handleDocumentFocus = (_: FocusEvent) => {
    const frameElement = this.frameRef.current;
    const activeElement = document.activeElement;
    if (frameElement && activeElement && frameElement.contains(activeElement)) {
      const box = activeElement.getBoundingClientRect();
      if (Math.round(this.props.slidesPerPage * this.state.slideWidth) <= Math.round(box.left)) {
        this.userRequestedIndex = this.state.index + 1;
        this.scrollToIndex(this.userRequestedIndex, true);
      }
    }
  };

  onPageClick = (index: number) => {
    this.userRequestedIndex = index;
    this.scrollToIndex(index);
  };

  onSkipClick = (_: React.SyntheticEvent) => {
    const lastElementRef = this.lastElementRef.current;
    if (lastElementRef) {
      lastElementRef.focus();
    }
  };

  onIndexChange = (index: number) => {
    this.setState({ index });
    if (this.props.onIndexChange) {
      this.props.onIndexChange(index);
    }
  };

  onResize = () => {
    const frameElement = this.frameRef.current;
    if (frameElement) {
      this.frameWidth = frameElement.getBoundingClientRect().width;
      this.setState({ slideWidth: Math.round(this.frameWidth / this.props.displayCount) });
    }
    this.updateScrollValues();
    this.updateArrowOffset();
    this.scrollToIndex(this.state.index, true);
  };

  onArrowClick = (direction: CarouselArrowDirection) => {
    const { arrowIncrement } = this.props;
    this.userRequestedIndex =
      direction === ARROW_DIRECTION_NEXT
        ? this.getNextIndex(this.state.index, arrowIncrement)
        : this.getPrevIndex(this.state.index, arrowIncrement);

    this.scrollToIndex(this.userRequestedIndex);
  };

  getPrevIndex = (index: number, arrowsIncrementType?: CarouselArrowIncrement): number => {
    switch (arrowsIncrementType) {
      case ARROW_INCREMENT_SINGLE:
        return Math.max(index - 1, 0);
      case ARROW_INCREMENT_PAGE:
        return Math.max(index - this.props.slidesPerPage, 0);
      case ARROW_INCREMENT_NONE:
      default:
        return 0;
    }
  };

  getNextIndex = (index: number, arrowsIncrementType: CarouselArrowIncrement): number => {
    switch (arrowsIncrementType) {
      case ARROW_INCREMENT_SINGLE:
        return Math.min(index + 1, this.props.maxIndex);
      case ARROW_INCREMENT_PAGE:
        return Math.min(index + this.props.slidesPerPage, this.props.maxIndex);
      case ARROW_INCREMENT_NONE:
      default:
        return this.props.maxIndex;
    }
  };

  getTouchEvents = () => {
    return {
      onTouchCancel: (_: React.TouchEvent) => {
        this.isTouching = false;
      },
      onTouchEnd: (_: React.TouchEvent) => {
        this.isTouching = false;
      },
      onTouchStart: (_: React.TouchEvent) => {
        this.isTouching = true;
      }
    };
  };

  render() {
    const {
      children,
      indicator,
      arrowIncrement,
      slidesTotal,
      displayCount,
      slidesPerPage,
      maxIndex,
      noPadding,
      slidePlaceholder,
      skipLinkText,
      carouselAriaLabel,
      arrowPositionSelector,
      onIndexChange,
      skipToId,
      ...rest
    } = this.props;
    const { index, arrowOffset } = this.state;
    const showPrevArrow =
      arrowIncrement !== ARROW_INCREMENT_NONE && this.getPrevIndex(index, arrowIncrement) < index;
    const showNextArrow =
      arrowIncrement !== ARROW_INCREMENT_NONE && this.getNextIndex(index, arrowIncrement) > index;
    const skipLink = skipToId ? (
      <a href={`#${skipToId}`} className={styles.carouselSkip}>
        {skipLinkText}
      </a>
    ) : (
      <button onClick={this.onSkipClick} className={styles.carouselSkip}>
        {skipLinkText}
      </button>
    );

    return (
      <Measure onResize={debounce(100, this.onResize)}>
        {({ measureRef }) => (
          <div
            className={styles.carousel}
            ref={measureRef}
            aria-label={carouselAriaLabel}
            {...rest}
          >
            {skipLink}
            <div className={styles.carouselScrollbarHide}>
              <div className={styles.carouselContainer}>
                <ul
                  className={noPadding ? styles.carouselFrame : styles.carouselFramePadded}
                  ref={this.frameRef}
                  onScroll={debounce(100, this.handleOnScroll)}
                  {...this.getTouchEvents()}
                >
                  <CarouselSlides
                    currentIndex={index}
                    displayCount={displayCount}
                    placeholder={slidePlaceholder}
                    noPadding={noPadding}
                    slideWidth={this.state.slideWidth}
                  >
                    {children}
                  </CarouselSlides>
                </ul>
                {showPrevArrow && (
                  <CarouselArrow
                    direction={ARROW_DIRECTION_PREV}
                    topOffset={arrowOffset}
                    onClick={this.onArrowClick}
                  />
                )}
                {showNextArrow && (
                  <CarouselArrow
                    direction={ARROW_DIRECTION_NEXT}
                    topOffset={arrowOffset}
                    onClick={this.onArrowClick}
                  />
                )}
              </div>
            </div>
            <CarouselPagination
              currentIndex={index}
              total={slidesTotal}
              itemsPerPage={slidesPerPage}
              onPageClick={this.onPageClick}
              indicatorType={indicator}
              forceLast={this.isMaxScroll}
            />
            {!skipToId && <div ref={this.lastElementRef} tabIndex={-1} aria-hidden="true" />}
          </div>
        )}
      </Measure>
    );
  }
}
