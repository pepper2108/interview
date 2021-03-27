import { shallow } from 'enzyme';
import SalaryComparisonChart from './SalaryComparisonChart';
import { render } from '@testing-library/react';

describe("SalaryComparisonChart", () => {

    const filters = [{ "checked": true, "label": "Japan" }, { "checked": false, "label": "China" }, { "checked": false, "label": "Malaysia" }];
    const rowValues = [{ "location": "China", "salary": 8516.873377976195 }, { "location": "Japan", "salary": 8305.026060606062 }];

    it("renders correctly", () => {
        const wrapper = shallow(<SalaryComparisonChart columnsNames={["Column"]} filters={filters} rowValues={rowValues} />);

        expect(wrapper).toMatchSnapshot();
    });

    it("contains a header", () => {
        const { container } = render(<SalaryComparisonChart columnsNames={["Column"]} filters={filters} rowValues={rowValues} />);

        const header = container.querySelector('[data-test-id="header"]');
        
        expect(header).toBeTruthy();
    });

});