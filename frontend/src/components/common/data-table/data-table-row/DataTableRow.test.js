import { shallow } from 'enzyme';
import DataTableRow from './DataTableRow';
import { render } from '@testing-library/react';

describe("DataTableRow", () => {

    it("renders correctly", () => {
        const wrapper = shallow(<DataTableRow rowValues={["China", "8 516,87 $", { "label": "+9.12%", "color": "#adff2e" }]} />);

        expect(wrapper).toMatchSnapshot();
    });

    it("renders a chip when there is a ChipProperties prop in rowValues", () => {
        const { container } = render(<DataTableRow rowValues={["China", "8 516,87 $", { "label": "+9.12%", "color": "#adff2e" }]} />);

        const chip = container.querySelector('[data-test-id="chip"]');
        
        expect(chip).toBeTruthy();
    });

    it("does not render a chip when there is no ChipProperties prop in rowValues", () => {
        const { container } = render(<DataTableRow rowValues={["China", "8 516,87 $", "test value"]} />);

        const chip = container.querySelector('[data-test-id="chip"]');
        
        expect(chip).toBeFalsy();
    });

});