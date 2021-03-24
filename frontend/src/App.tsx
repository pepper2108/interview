import { Tabs, Tab } from '@material-ui/core';
import React, { ChangeEvent, useState } from 'react';
import SalaryAnalytics from './components/salary-analytics/SalaryAnalytics';

function App() {
	const [currentTabIndex, setCurrentTabIndex] = useState(0);

	const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
		setCurrentTabIndex(newValue);
	};

	const tabIndexes = {
		salaryTableAnalytics: 0,
		salaryChartAnalytics: 1
	};

	return (
		<div className="App">
			<Tabs
				value={currentTabIndex}
				onChange={handleChange}
				indicatorColor="primary"
				textColor="primary"
				centered
			>
				<Tab label="Table" />
				<Tab label="Chart" />
			</Tabs>
			{
				currentTabIndex === tabIndexes.salaryTableAnalytics ? 
					<SalaryAnalytics columnsNames={["Location", "Salary", "Delta"]} /> :
					<></>
			}
			
		</div>
	);
}

export default App;
