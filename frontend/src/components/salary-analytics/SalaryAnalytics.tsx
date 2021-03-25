import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { getEmployeeSalaryData } from "../../api/SalaryAnalyticsApi";
import { CheckboxGroupProperties } from "../common/interfaces";
import { EmployeeDataByCountry, EmployeeData, SalaryComparisonData } from "./interfaces";
import EmployeeTable from "./salary-comparison-table/SalaryComparisonTable";

export interface SalaryAnalyticsProps {
    columnsNames: string[];
}

export const SalaryAnalytics = ({ columnsNames }: SalaryAnalyticsProps): JSX.Element => {
    const [rawEmployeeData, setRawEmployeeData] = useState<EmployeeData[]>([]);
    const [employeeDataByCountry, setEmployeeDataByCountry] = useState<EmployeeDataByCountry>({});
    const [aggregatedEmployeeDataByCountry, setAggregatedEmployeeDataByCountry] = useState<SalaryComparisonData[]>([]);
    const [filters, setFilters] = useState<CheckboxGroupProperties>({ groupLabel: "Countries", checkboxes: [], changeHandler: (event) => onFilterChange(event)});
    const isInitialMount = useRef(true);
    const filtersRef = useRef(filters);
    const allCountriesLabel = "All countries";

    const onFilterChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const indexOfChangedFilter = filtersRef.current.checkboxes.findIndex((checkbox) => checkbox.label === event.target.name);
        const newCheckboxes = [...filtersRef.current.checkboxes];
        newCheckboxes[indexOfChangedFilter].checked = !newCheckboxes[indexOfChangedFilter].checked;
        if (event.target.name === allCountriesLabel) {
            newCheckboxes.forEach(checkbox => checkbox.checked = false);
            newCheckboxes[0].checked = true;
        } else {
            newCheckboxes[0].checked = newCheckboxes.every(checkbox => !checkbox.checked);
        }
        setFilters({...filtersRef.current, checkboxes: newCheckboxes });
    }

    useEffect((): void => {
        setRawEmployeeData(getEmployeeSalaryData());
    }, []);

    useEffect((): void => {
        if (rawEmployeeData.length) {
            const employeeDataByCountry = groupBy(rawEmployeeData, "location");
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
            let averageData: SalaryComparisonData[] = [];
            let totalData: SalaryComparisonData = { location: "Total", salary: 0, delta: 0 };
            const currentlySelectedCountries = filters.checkboxes
                .filter(checkbox => checkbox.checked)
                .map(activeCheckbox => activeCheckbox.label);
            const dataToVisualize = currentlySelectedCountries.includes(allCountriesLabel) ? employeeDataByCountry : filterCountries(employeeDataByCountry, currentlySelectedCountries);

            Object.entries(dataToVisualize).forEach(([country, employeeData]: [string, EmployeeData[]]) => {
                const aggregatedEmployeeData = employeeData.reduce((result: SalaryComparisonData, currentValue: EmployeeData) => {
                    const parsedCurrentSalary = parseFloat(currentValue.currSalary.substring(1));
                    const parsedPreviousSalary = parseFloat(currentValue.prevSalary.substring(1));
                    result.salary += parsedCurrentSalary;
                    result.delta += ((parsedPreviousSalary / parsedCurrentSalary) * 100) - 100;

                    return result;
                }, { location: country, salary: 0, delta: 0 } as SalaryComparisonData);
                aggregatedEmployeeData.salary = parseFloat((aggregatedEmployeeData.salary / employeeData.length).toFixed(2));
                aggregatedEmployeeData.delta = parseFloat((aggregatedEmployeeData.delta / employeeData.length).toFixed(2));

                averageData.push(aggregatedEmployeeData);
            });

            totalData.salary = getTotalData(averageData, "salary");
            totalData.delta = parseFloat(getTotalData(averageData, "delta").toFixed(2));

            averageData.push(totalData);

            setAggregatedEmployeeDataByCountry(averageData);
        }
    }, [filters, employeeDataByCountry]);

    const groupBy = (array: any[], key: string): { [key: string]: any[]} => {
        return array.reduce((result: any, currentValue: any) => {
          (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);

          return result;
        }, {});
    };

    const getTotalData = (array: any[], pointer: string): number => {
        return array
            .map(value => value[pointer])
            .reduce((accumulator, currentValue) => accumulator + currentValue) / array.length;
    };

    const filterCountries = (rawData: EmployeeDataByCountry, filters: any[]) => {
        return Object.fromEntries(
            Object.entries(rawData).filter(([key, val]) => filters.includes(key))
        )
    };

    return (
        <>
            <EmployeeTable columnsNames={columnsNames} rowValues={aggregatedEmployeeDataByCountry} filters={filters}/>
        </>
    )
};

export default SalaryAnalytics;