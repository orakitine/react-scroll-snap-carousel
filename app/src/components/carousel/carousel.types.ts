import { BreakPointProp, CarouselArrowIncrement, CarouselIndicator } from "./types";

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of Slides to show in carousel. Could be a decimal value. Minimum is 1
   * @default 1
   */
  displayCount?: BreakPointProp<number> | number;

  /**
   * Style of the carousel position indicator
   * 'pages' - Displays clickable bullet points ("meatballs")
   * 'number' - Ex. 2/10
   * 'none' - nothing
   * @default pages
   */
  indicator?: BreakPointProp<CarouselIndicator> | CarouselIndicator;

  /**
   * Number of slides to scroll by for side arrow buttons
   * 'none' - Arrow will not be rendered
   * 'single' - Arrows moves one slide over
   * 'page'; - Arrow moves whole amount of displayed items.
   * @default page
   */
  arrowsIncrement?: BreakPointProp<CarouselArrowIncrement> | CarouselArrowIncrement;

  /**
   * Contents for the slides.
   * @required
   */
  children: React.ReactNode;

  /**
   * Sets current index of the carousel. It is 0 based. Indexed item will be first slide on the left.
   * @default 0
   */
  index?: number;

  /**
   * A placeholder Element for slides that are not rendered.
   * If it is present, there will be limited number of slides rendered.
   * Rendered slides are Math.max(5, Math.ceil(displayCount) * 2) on each side of the visible portion of the carousel.
   */
  slidePlaceholder?: JSX.Element;

  /**
   * A query string to look up an element in the slide.
   * If it is present, navigation arrow will be centered relative to that element.
   * If string is not provided or element is not found Arrow will be vertically centered
   * Must be a valid CSS selector string.
   */
  arrowPositionSelector?: string;

  /**
   * Removes padding from slides if true.
   * @default false
   */
  noPadding?: boolean;

  /**
   * An event that is fired every time Carousel successfully changes index.
   */
  onIndexChange?: (index: number) => void;

  /**
   * Text string for the Skip carousel content button. It will show up when focused. Ex: 'Skip carousel content'
   * @required
   */
  skipLinkText: string;

  /**
   * Optional id for a skip link to go to. If provided Skip button will be an anchor link to this id.
   */
  skipToId?: string;

  /**
   * Text string to describe Carousel and its contents
   * @required
   */
  carouselAriaLabel: string;
}
