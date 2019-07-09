export interface CarouselSlidesProps {
  children: React.ReactNode;
  displayCount: number;
  currentIndex: number;
  noPadding: boolean;
  placeholder?: JSX.Element;
  slideWidth: number;
}
