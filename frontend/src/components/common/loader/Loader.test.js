import { shallow } from 'enzyme';
import { Loader } from './Loader';

describe("Loader", () => {

    it("renders correctly", () => {
        const wrapper = shallow(<Loader loadingLabel={"Loading..."} />);

        expect(wrapper).toMatchSnapshot();
    });

    it("renders a loading message", () => {
        const wrapper = shallow(<Loader loadingLabel={"test1234"} />);

        expect(wrapper.contains(<p>test1234</p>));
    });

});