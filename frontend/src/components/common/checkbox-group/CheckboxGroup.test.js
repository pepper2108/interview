import { CheckboxGroup } from "./CheckboxGroup";
import { render } from '@testing-library/react';
import renderer from "react-test-renderer";

describe("CheckboxGroup", () => {

    const filters = [{ "checked": true, "label": "Japan" }, { "checked": false, "label": "China" }, { "checked": false, "label": "Malaysia" }];

    it("renders correctly", () => {
        const component = renderer.create(<CheckboxGroup groupLabel={"Test group of checkboxes"} changeHandler={() => { }} checkboxes={filters} />).toJSON();

        expect(component).toMatchSnapshot();
    });

    it("should render a correct amount of checkboxes", () => {
        const { container } = render(<CheckboxGroup groupLabel={"Test group of checkboxes"} changeHandler={() => { }} checkboxes={filters} />);

        const items = container.querySelectorAll(".MuiFormControlLabel-root");
        
        expect(items.length).toEqual(3);
    });

});