import { shallow } from 'enzyme';
import SalaryAnalytics from './SalaryAnalytics';

describe("SalaryAnalytics", () => {

    it("renders correctly", () => {
        const wrapper = shallow(<SalaryAnalytics/>);

        expect(wrapper).toMatchSnapshot();
    });

});