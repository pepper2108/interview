import { Chip } from './Chip';
import { shallow } from 'enzyme';

describe("Chip", () => {

    const chipProperties = { label: "Chip", color: "green" };

    it("renders correctly", () => {
        const wrapper = shallow(<Chip color={chipProperties.color} label={chipProperties.label} />);

        expect(wrapper).toMatchSnapshot();
    });

});