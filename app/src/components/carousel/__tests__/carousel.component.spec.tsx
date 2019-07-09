import * as React from "react";
import testComponentHelper from "../../../../../test/unit/helpers/ComponentHelper";
import { Carousel } from "../carousel.component";

describe("<Header />", () => {
  const initialProps = {
    displayCount: 2.2,
    skipLinkText: "Skip carousel content",
    carouselAriaLabel: "A carousel of cats",
    slidePlaceholder: <div>placeholder</div>,
    children: (
      <React.Fragment>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
      </React.Fragment>
    )
  };
  const renderComponent = testComponentHelper(Carousel);

  describe("@renders", () => {
    it("in default state", () => {
      expect(renderComponent().getHtml()).toMatchSnapshot();
    });
  });
});
