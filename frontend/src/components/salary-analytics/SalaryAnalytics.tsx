import { Tab, Tabs } from "@material-ui/core";
import React, { ChangeEvent, lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { getEmployeeSalaryData } from "../../api/SalaryAnalyticsApi";
import { CheckboxGroupProperties } from "../common/interfaces";
import { Loader } from "../common/loader/Loader";
import { filterSelectedCountries, getAveragesByCountry, getDataForTotalColumn, groupEmployeesByCountry } from "./helpers";
import { EmployeeDataByCountry, EmployeeData, SalaryComparisonData } from "./interfaces";

export const SalaryAnalytics = (): JSX.Element => {
    const [rawEmployeeData, setRawEmployeeData] = useState<EmployeeData[]>([]);
    const [employeeDataByCountry, setEmployeeDataByCountry] = useState<EmployeeDataByCountry>({});
    const [aggregatedEmployeeDataByCountry, setAggregatedEmployeeDataByCountry] = useState<SalaryComparisonData[]>([]);
    const [filters, setFilters] = useState<CheckboxGroupProperties>({ groupLabel: "Countries", checkboxes: [], changeHandler: (event) => onFilterChange(event)});
    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const isInitialMount = useRef(true);
    const filtersRef = useRef(filters);

    const TableComponent = useMemo(() => lazy(() => import("./salary-comparison-table/SalaryComparisonTable")), []);
    const ChartComponent = useMemo(() => lazy(() => import("./salary-comparison-chart/SalaryComparisonChart")), []);

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
        getEmployeeSalaryData().then(salaryData => {
            setRawEmployeeData(salaryData as EmployeeData[]);
            setIsDataLoaded(true);
        });
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
            <Suspense fallback={Loader({ loadingLabel: "Loading..." })}>
                {
                    isDataLoaded ?
                            currentTabIndex === tabIndexes.salaryTableAnalytics ? 
                                <TableComponent columnsNames={["Location", "Salary", "Delta"]} rowValues={aggregatedEmployeeDataByCountry} filters={filters}/> :
                                <ChartComponent columnsNames={["Bar chart"]}
                                    rowValues={aggregatedEmployeeDataByCountry.map(({ location, salary }) => ({location, salary}))} 
                                    filters={filters}/>
                        : <Loader loadingLabel={"Fetching..."}/>
                }
			
            </Suspense>
        </>
    )
};

export default SalaryAnalytics;