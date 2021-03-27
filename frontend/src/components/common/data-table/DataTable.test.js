import { shallow } from 'enzyme';
import DataTable from './DataTable';

describe("DataTable", () => {

    const filters = {
        groupLabel:"Countries",
        checkboxes:[{"checked":true,"label":"All countries"},{"checked":false,"label":"China"},{"checked":false,"label":"Japan"}],
        changeHandler: () => {}
    };
    
    const rowValues = [
        ["China", "8 516,87 $", { "label": "+9.12%", "color": "#adff2e" }],
        ["Japan", "8 305,03 $", { "label": "+24.36%", "color": "#adff2e" }],
        ["Philippines", "8 215,59 $", { "label": "+17.09%", "color": "#adff2e" }]
    ];

    it("renders correctly", () => {
        const wrapper = shallow(<DataTable columns={["col1", "col2", "col3"]} filters={filters} rowValues={rowValues}/>);

        expect(wrapper).toMatchSnapshot();
    });

});