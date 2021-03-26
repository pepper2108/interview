import { Tab, Tabs } from "@material-ui/core";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { getEmployeeSalaryData } from "../../api/SalaryAnalyticsApi";
import { CheckboxGroupProperties } from "../common/interfaces";
import { EmployeeDataByCountry, EmployeeData, SalaryComparisonData } from "./interfaces";
import SalaryComparisonChart from "./salary-comparison-chart/SalaryComparisonChart";
import SalaryComparisonTable from "./salary-comparison-table/SalaryComparisonTable";


export const SalaryAnalytics = (): JSX.Element => {
    const [rawEmployeeData, setRawEmployeeData] = useState<EmployeeData[]>([]);
    const [employeeDataByCountry, setEmployeeDataByCountry] = useState<EmployeeDataByCountry>({});
    const [aggregatedEmployeeDataByCountry, setAggregatedEmployeeDataByCountry] = useState<SalaryComparisonData[]>([]);
    const [filters, setFilters] = useState<CheckboxGroupProperties>({ groupLabel: "Countries", checkboxes: [], changeHandler: (event) => onFilterChange(event)});
    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const isInitialMount = useRef(true);
    const filtersRef = useRef(filters);
    const allCountriesLabel = "All countries";
    const allCountriesCheckboxIndex = 0;

	const tabIndexes = {
		salaryTableAnalytics: 0,
		salaryChartAnalytics: 1
	};

    const onTabChange = (event: ChangeEvent<{}>, newValue: number) => {
		setCurrentTabIndex(newValue);
	};

    const onFilterChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const indexOfChangedFilter = filtersRef.current.checkboxes.findIndex((checkbox) => checkbox.label === event.target.name);
        const newCheckboxes = [...filtersRef.current.checkboxes];
        newCheckboxes[indexOfChangedFilter].checked = !newCheckboxes[indexOfChangedFilter].checked;
        if (event.target.name === allCountriesLabel) {
            newCheckboxes.forEach(checkbox => checkbox.checked = false);
            newCheckboxes[allCountriesCheckboxIndex].checked = true;
        } else {
            newCheckboxes[allCountriesCheckboxIndex].checked = newCheckboxes.every(checkbox => !checkbox.checked);
        }
        setFilters({...filtersRef.current, checkboxes: newCheckboxes });
    }

    useEffect((): void => {
        setRawEmployeeData(getEmployeeSalaryData());
    }, []);

    useEffect((): void => {
        if (rawEmployeeData.length) {
            const employeeDataByCountry = groupEmployeesByCountry(rawEmployeeData, "location");
            const checkboxes = Object.keys(employeeDataByCountry).map((country: string) => {
                return {
                    checked: false,
                    label: country
                }
            });
            checkboxes.unshift({ checked: true, label: allCountriesLabel });

            setFilters((filters) => ({...filters, checkboxes: checkboxes}));
            setEmployeeDataByCountry(employeeDataByCountry);
        }
    }, [rawEmployeeData]);

    useEffect((): void => {
        filtersRef.current = filters;
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            let totalColumnData: SalaryComparisonData = { location: "Total", salary: 0, delta: 0 };
            const currentlySelectedCountries = filters.checkboxes
                .filter(checkbox => checkbox.checked)
                .map(activeCheckbox => activeCheckbox.label);
            const shownData: EmployeeDataByCountry = currentlySelectedCountries.includes(allCountriesLabel) 
                ? employeeDataByCountry 
                : filterSelectedCountries(employeeDataByCountry, currentlySelectedCountries);

            const averageData = getAveragesByCountry(shownData);

            totalColumnData.salary = getDataForTotalColumn(averageData, "salary");
            totalColumnData.delta = parseFloat(getDataForTotalColumn(averageData, "delta").toFixed(2));

            averageData.push(totalColumnData);

            setAggregatedEmployeeDataByCountry(averageData);
        }
    }, [filters, employeeDataByCountry]);

    const groupEmployeesByCountry = (array: any[], key: string): { [key: string]: EmployeeData[]} => {
        return array.reduce((result: any, currentValue: any) => {
          (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);

          return result;
        }, {});
    };

    const getDataForTotalColumn = (array: any[], pointer: string): number => {
        return array
            .map(value => value[pointer])
            .reduce((accumulator, currentValue) => accumulator + currentValue) / array.length;
    };

    const filterSelectedCountries = (rawData: EmployeeDataByCountry, filters: any[]): { [key: string]: EmployeeData[] } => {
        return Object.fromEntries(Object.entries(rawData)
            .filter(([key]) => filters.includes(key)));
    };

    const getAveragesByCountry = (shownData: EmployeeDataByCountry): SalaryComparisonData[] => {
        let averageData: SalaryComparisonData[] = [];

        const calculateAverageValues = (aggregatedEmployeeData: SalaryComparisonData, employeesAmount: number): SalaryComparisonData => {
            return {
                salary: aggregatedEmployeeData.salary / employeesAmount,
                delta: parseFloat((aggregatedEmployeeData.delta / employeesAmount).toFixed(2)),
                location: aggregatedEmployeeData.location
            };
        };

        Object.entries(shownData).forEach(([country, employeeData]: [string, EmployeeData[]]) => {
            const aggregatedEmployeeData = employeeData.reduce((result: SalaryComparisonData, currentValue: EmployeeData) => {
                const parsedCurrentSalary = parseFloat(currentValue.currSalary.substring(1));
                const parsedPreviousSalary = parseFloat(currentValue.prevSalary.substring(1));
                result.salary += parsedCurrentSalary;
                result.delta += ((parsedPreviousSalary / parsedCurrentSalary) * 100) - 100;

                return result;
            }, { location: country, salary: 0, delta: 0 } as SalaryComparisonData);
            const averageDataByCountry = calculateAverageValues(aggregatedEmployeeData, employeeData.length);

            averageData.push(averageDataByCountry);
        });

        return averageData;
    }

    return (
        <>
            <Tabs
				value={currentTabIndex}
				onChange={onTabChange}
				indicatorColor="primary"
				textColor="primary"
				centered
			>
				<Tab label="Table" />
				<Tab label="Chart" />
			</Tabs>
			{
				currentTabIndex === tabIndexes.salaryTableAnalytics ? 
                    <SalaryComparisonTable columnsNames={["Location", "Salary", "Delta"]} rowValues={aggregatedEmployeeDataByCountry} filters={filters}/> :
					<SalaryComparisonChart columnsNames={["Bar chart"]}
                         rowValues={aggregatedEmployeeDataByCountry.map(({ location, salary }) => ({location, salary}))} 
                         filters={filters}/>
			}
        </>
    )
};

export default SalaryAnalytics;