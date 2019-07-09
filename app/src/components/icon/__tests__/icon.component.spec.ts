import testComponentHelper from "../../../../../test/unit/helpers/ComponentHelper";
import { Icon } from "./../icon.component";

describe("<Header />", () => {
  const initialProps = {
    className: ""
  };
  const renderComponent = testComponentHelper(Icon);

  describe("@renders", () => {
    it("in default state", () => {
      expect(renderComponent().getHtml()).toMatchSnapshot();
    });
  });
});
