import { shallow } from 'enzyme';
import DataTableHeader from './DataTableHeader';

describe("DataTableHeader", () => {

    let filters = [{ "checked": true, "label": "Japan" }, { "checked": false, "label": "China" }, { "checked": false, "label": "Malaysia" }];

    it("renders correctly", () => {
        const wrapper = shallow(<DataTableHeader columns={["col1", "col2", "col3"]} filters={filters} />);

        expect(wrapper).toMatchSnapshot();
    });

    it("renders a correct amount of columns", () => {
        const wrapper = shallow(<DataTableHeader columns={["col1", "col2", "col3"]} filters={filters} />);

        const columns = wrapper.find('p[data-test-id="column"]');

        expect(columns.length).toBe(3);
    });

    it("opens a popover with filters when filters button is clicked", () => {
        const wrapper = shallow(<DataTableHeader columns={["col1", "col2", "col3"]} filters={filters} />);

        const buttonElement = wrapper.find('[data-test-id="filters-button"]');
        buttonElement.simulate('click', { currentTarget: buttonElement });
        const popoverElement = wrapper.find("#simple-popover");

        expect(popoverElement.exists()).toBeTruthy();
    });

});