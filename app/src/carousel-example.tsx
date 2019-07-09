import * as React from "react";

import { Carousel } from "./components/carousel";

import {
  ARROW_INCREMENT_NONE,
  ARROW_INCREMENT_PAGE,
  ARROW_INCREMENT_SINGLE,
  CarouselArrowIncrement,
  CarouselIndicator,
  INDICATOR_NONE,
  INDICATOR_NUMBER,
  INDICATOR_PAGES
} from "./components/carousel/types/index";
import { BP_LARGE, BP_MEDIUM, BP_SMALL, BP_X_LARGE, BreakpointKey, count } from "./utils";

import * as styles from "./carousel-example.css";

interface CarouselExampleState {
  arrowsIncrement: { [key in BreakpointKey]: CarouselArrowIncrement };
  arrowPositionSelector: string;
  index: string;
  imageCount: string;
  displayCount: { [key in BreakpointKey]: string };
  indicators: { [key in BreakpointKey]: CarouselIndicator };
  limitRenderedSlides: boolean;
  noPadding: boolean;
  skipToGoogle: boolean;
}

class CarouselExample extends React.Component<{}, CarouselExampleState> {
  private indicatorTypes: CarouselIndicator[] = [INDICATOR_NONE, INDICATOR_NUMBER, INDICATOR_PAGES];
  private arrowsIncrementTypes: CarouselArrowIncrement[] = [
    ARROW_INCREMENT_NONE,
    ARROW_INCREMENT_SINGLE,
    ARROW_INCREMENT_PAGE
  ];

  constructor(props: {}) {
    super(props);

    this.state = {
      arrowPositionSelector: "img",
      arrowsIncrement: {
        lg: ARROW_INCREMENT_PAGE,
        md: ARROW_INCREMENT_PAGE,
        sm: ARROW_INCREMENT_NONE,
        xl: ARROW_INCREMENT_PAGE
      },
      displayCount: {
        lg: "4.5",
        md: "3.5",
        sm: "1",
        xl: "6.5"
      },
      imageCount: "14",
      index: "0",
      indicators: {
        lg: INDICATOR_PAGES,
        md: INDICATOR_PAGES,
        sm: INDICATOR_NUMBER,
        xl: INDICATOR_NONE
      },
      limitRenderedSlides: true,
      noPadding: false,
      skipToGoogle: false
    };
  }

  changeIndex = (index: number) => {
    // tslint:disable-next-line: no-console
    console.log("Carousel Index changed:", index);
    // this.setState({ index });
  };

  renderImages = (times: number) => {
    return count(times).map((_, index) => (
      <div key={index} className={styles.exampleSlide}>
        <img
          style={{ width: "100%" }}
          src={`https://loremflickr.com/g/300/300/Cat?lock=${index}`}
          alt={`image ${index}`}
        />
        <button className={styles.exampleSlideLink}>Text Link</button>
        <div>Index: {index}</div>
      </div>
    ));
  };

  renderIndicatorOptions = () =>
    this.indicatorTypes.map((value, index) => (
      <option key={index} value={value} aria-selected={false}>
        {value.toUpperCase()}
      </option>
    ));

  renderArrowsIncrementOptions = () =>
    this.arrowsIncrementTypes.map((value, index) => (
      <option key={index} value={value} aria-selected={false}>
        {value.toUpperCase()}
      </option>
    ));

  setImageCount = (event: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      imageCount: event.currentTarget.value
    });
  };

  setIndex = (event: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      index: event.currentTarget.value
    });
  };

  setArrowsPositionQuerySelectorString = (event: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      arrowPositionSelector: event.currentTarget.value
    });
  };

  setDisplayCount = (size: BreakpointKey) => (event: React.SyntheticEvent<HTMLInputElement>) => {
    const newDisplayCount = this.state.displayCount;
    newDisplayCount[size] = event.currentTarget.value;
    this.setState({
      displayCount: newDisplayCount
    });
  };

  setIndicators = (size: BreakpointKey) => (event: React.SyntheticEvent<HTMLSelectElement>) => {
    const newIndicators = this.state.indicators;
    newIndicators[size] = event.currentTarget.value as CarouselIndicator;
    this.setState({
      indicators: newIndicators
    });
  };
  setArrowsIncrement = (size: BreakpointKey) => (
    event: React.SyntheticEvent<HTMLSelectElement>
  ) => {
    const newArrowsIncrement = this.state.arrowsIncrement;
    newArrowsIncrement[size] = event.currentTarget.value as CarouselArrowIncrement;
    this.setState({
      arrowsIncrement: newArrowsIncrement
    });
  };
  toggleNoPadding = (_: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      noPadding: !this.state.noPadding
    });
  };
  toggleSkipToGoogle = (_: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      skipToGoogle: !this.state.skipToGoogle
    });
  };
  toggleLimitRenderedSlides = (_: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      limitRenderedSlides: !this.state.limitRenderedSlides
    });
  };

  render() {
    const imageCount = parseInt(this.state.imageCount, 0);
    const index = parseInt(this.state.index, 0);
    const skipID = "google";
    return (
      <React.Fragment>
        <Carousel
          index={index}
          displayCount={{
            lg: this.state.displayCount.lg === "" ? 1 : parseFloat(this.state.displayCount.lg),
            md: this.state.displayCount.md === "" ? 1 : parseFloat(this.state.displayCount.md),
            sm: this.state.displayCount.sm === "" ? 1 : parseFloat(this.state.displayCount.sm),
            xl: this.state.displayCount.xl === "" ? 1 : parseFloat(this.state.displayCount.xl)
          }}
          indicator={{
            lg: this.state.indicators.lg,
            md: this.state.indicators.md,
            sm: this.state.indicators.sm,
            xl: this.state.indicators.xl
          }}
          arrowsIncrement={{
            lg: this.state.arrowsIncrement.lg,
            md: this.state.arrowsIncrement.md,
            sm: this.state.arrowsIncrement.sm,
            xl: this.state.arrowsIncrement.xl
          }}
          skipLinkText="Skip carousel content"
          skipToId={this.state.skipToGoogle ? skipID : undefined}
          carouselAriaLabel="A carousel of images of cats"
          onIndexChange={this.changeIndex}
          arrowPositionSelector={this.state.arrowPositionSelector || undefined}
          noPadding={this.state.noPadding}
          slidePlaceholder={this.state.limitRenderedSlides ? <div>placeholder</div> : undefined}
        >
          {this.renderImages(imageCount ? imageCount : 1)}
        </Carousel>

        <hr />

        <label htmlFor="image-count">Number of Images</label>
        <input
          type="text"
          id="image-count"
          value={this.state.imageCount}
          onChange={this.setImageCount}
        />
        <label htmlFor="index">Index</label>
        <input id="index" value={this.state.index.toString()} onChange={this.setIndex} />
        <hr />

        <div className={styles.controlsRow}>
          <div>
            <label htmlFor="i-display-count-sm">{BP_SMALL}</label>
            <input
              type="text"
              id="i-display-count-sm"
              value={this.state.displayCount[BP_SMALL]}
              onChange={this.setDisplayCount(BP_SMALL)}
            />
          </div>
          <div>
            <label htmlFor="i-display-count-md">{BP_MEDIUM}</label>
            <input
              type="text"
              id="i-display-count-md"
              value={this.state.displayCount[BP_MEDIUM]}
              onChange={this.setDisplayCount(BP_MEDIUM)}
            />{" "}
          </div>
          <div>
            <label htmlFor="i-display-count-lg">{BP_LARGE}</label>
            <input
              type="text"
              id="i-display-count-lg"
              value={this.state.displayCount[BP_LARGE]}
              onChange={this.setDisplayCount(BP_LARGE)}
            />{" "}
          </div>
          <div>
            <label htmlFor="i-display-count-xl">{BP_X_LARGE}</label>
            <input
              type="text"
              id="i-display-count-xl"
              value={this.state.displayCount[BP_X_LARGE]}
              onChange={this.setDisplayCount(BP_X_LARGE)}
            />
          </div>
        </div>
        <div className={styles.controlsRow}>
          <div>
            <select
              id="i-indicators-sm"
              value={this.state.indicators[BP_SMALL]}
              onChange={this.setIndicators(BP_SMALL)}
            >
              {this.renderIndicatorOptions()}
            </select>{" "}
          </div>
          <div>
            <select
              id="i-indicators-md"
              value={this.state.indicators[BP_MEDIUM]}
              onChange={this.setIndicators(BP_MEDIUM)}
            >
              {this.renderIndicatorOptions()}
            </select>{" "}
          </div>
          <div>
            <select
              id="i-indicators-lg"
              value={this.state.indicators[BP_LARGE]}
              onChange={this.setIndicators(BP_LARGE)}
            >
              {this.renderIndicatorOptions()}
            </select>{" "}
          </div>
          <div>
            <select
              id="i-indicators-xl"
              value={this.state.indicators[BP_X_LARGE]}
              onChange={this.setIndicators(BP_X_LARGE)}
            >
              {this.renderIndicatorOptions()}
            </select>{" "}
          </div>
        </div>
        <div className={styles.controlsRow}>
          <div>
            <select
              id="i-arrows-sm"
              value={this.state.arrowsIncrement[BP_SMALL]}
              onChange={this.setArrowsIncrement(BP_SMALL)}
            >
              {this.renderArrowsIncrementOptions()}
            </select>
          </div>
          <div>
            <select
              id="i-arrows-md"
              value={this.state.arrowsIncrement[BP_MEDIUM]}
              onChange={this.setArrowsIncrement(BP_MEDIUM)}
            >
              {this.renderArrowsIncrementOptions()}
            </select>{" "}
          </div>
          <div>
            <select
              id="i-arrows-lg"
              value={this.state.arrowsIncrement[BP_LARGE]}
              onChange={this.setArrowsIncrement(BP_LARGE)}
            >
              {this.renderArrowsIncrementOptions()}
            </select>{" "}
          </div>
          <div>
            <select
              id="i-arrows-xl"
              value={this.state.arrowsIncrement[BP_X_LARGE]}
              onChange={this.setArrowsIncrement(BP_X_LARGE)}
            >
              {this.renderArrowsIncrementOptions()}
            </select>{" "}
          </div>
        </div>
        <hr />
        <label htmlFor="arrowPositionSelector">Arrows Position Query Selector</label>
        <input
          type="text"
          id="arrowPositionSelector"
          value={this.state.arrowPositionSelector}
          onChange={this.setArrowsPositionQuerySelectorString}
        />
        <label htmlFor="noPadding">No padding</label>
        <input
          type="checkbox"
          id="noPadding"
          checked={this.state.noPadding}
          onChange={this.toggleNoPadding}
        />
        <label htmlFor="limitRenderedSlides">Limit Rendered Slides</label>
        <input
          type="checkbox"
          id="limitRenderedSlides"
          checked={this.state.limitRenderedSlides}
          onChange={this.toggleLimitRenderedSlides}
        />
        <label htmlFor="skipToGoogle">Provide 'google' id to skipToId prop</label>
        <input
          type="checkbox"
          id="skipToGoogle"
          checked={this.state.skipToGoogle}
          onChange={this.toggleSkipToGoogle}
        />
        {this.state.skipToGoogle && (
          <>
            <br />
            <a id={skipID} href="google.com">
              Skip carousel will jump to this link
            </a>
          </>
        )}
      </React.Fragment>
    );
  }
}

export default CarouselExample;
