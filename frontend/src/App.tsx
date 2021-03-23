import React from 'react';
import EmployeeTable from './components/employee-table/EmployeeTable';

function App() {
  return (
    <div className="App">
        <p>Tabs will be here at some point too</p>
        <EmployeeTable columnsNames={["Location", "Salary", "Delta"]} rowValues={[{location: "Singapore", salary: 100000, delta: { sign: "+", amount: 15} }, {location: "Kyiv", salary: 10000, delta: { sign: "+", amount: 5} }]}/>
    </div>
  );
}

export default App;
