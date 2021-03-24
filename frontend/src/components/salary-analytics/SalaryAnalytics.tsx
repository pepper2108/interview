import React, { useEffect, useRef, useState } from "react";
import { getEmployeeSalaryData } from "../../api/SalaryAnalyticsApi";
import { CheckboxGroupProperties } from "../common/interfaces";
import { EmployeeDataByCountry, EmployeeData, SalaryComparisonData } from "./interfaces";
import EmployeeTable from "./salary-comparison-table/EmployeeTable";
import useDeepCompareEffect from "use-deep-compare-effect";

export interface SalaryAnalyticsProps {
    columnsNames: string[];
}

export const SalaryAnalytics = ({ columnsNames }: SalaryAnalyticsProps): JSX.Element => {
    const [rawEmployeeData, setRawEmployeeData] = useState<EmployeeData[]>([]);
    const [employeeDataByCountry, setEmployeeDataByCountry] = useState<EmployeeDataByCountry>({});
    const [aggregatedEmployeeDataByCountry, setAggregatedEmployeeDataByCountry] = useState<SalaryComparisonData[]>([]);
    const [filters, setFilters] = useState<CheckboxGroupProperties>({ groupLabel: "Countries", checkboxes: [] });
    const isInitialMount = useRef(true);

    useEffect(() => {
        setRawEmployeeData(getEmployeeSalaryData());
    }, []);

    useEffect(() => {
        if (rawEmployeeData.length) {
            const employeeDataByCountry = groupBy(rawEmployeeData, "location");
            const checkboxes = Object.keys(employeeDataByCountry).map((country: string) => {
                return {
                    checked: false,
                    label: country
                }
            });
            checkboxes.unshift({ checked: true, label: "All countries" });

            setFilters((filters) => ({...filters, checkboxes: checkboxes, changeHandler: (event) => console.log(event)}));
            setEmployeeDataByCountry(employeeDataByCountry);
        }
    }, [rawEmployeeData]);

    useDeepCompareEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            let averageData: SalaryComparisonData[] = [];
            let totalData: SalaryComparisonData = { location: "Total", salary: 0, delta: 0 };

            Object.entries(employeeDataByCountry).forEach(([country, employeeData]: [string, EmployeeData[]]) => {
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
    }, [employeeDataByCountry]);

    const groupBy = (array: any[], key: string) => {
        return array.reduce((result: any, currentValue: any) => {
          (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);

          return result;
        }, {});
    };

    const getTotalData = (array: any[], pointer: string) => {
        return array
            .map(value => value[pointer])
            .reduce((accumulator, currentValue) => accumulator + currentValue) / array.length;
    }

    return (
        <>
            <EmployeeTable columnsNames={columnsNames} rowValues={aggregatedEmployeeDataByCountry} filters={filters}/>
        </>
    )
};

export default SalaryAnalytics;