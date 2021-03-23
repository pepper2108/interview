import React, { useEffect, useState } from "react";
import DataTable from "../common/data-table/DataTable";

export interface EmployeeTableProps {
    columnsNames: string[];
    rowValues: EmployeeData[];
}

export interface EmployeeData {
    location: string;
    salary: number;
    delta: {
        sign: "+" | "-";
        amount: number;
    }
}

export const EmployeeTable = ({ columnsNames, rowValues }: EmployeeTableProps): JSX.Element => {
    const [mappedRowValues, setMappedRowValues] = useState<string[][]>([]);

    const adaptRowValues = (rowValues: EmployeeData[]): string[][] => rowValues.map((value: EmployeeData) => {
        // todo split salary
        return [value.location, `$${value.salary}`, `${value.delta.sign}${value.delta.amount}%`]
    });

    useEffect(() => {
        const adaptedRowValues = adaptRowValues(rowValues);
        setMappedRowValues(adaptedRowValues);
    }, [rowValues]);

    return (
        <DataTable columnsNames={columnsNames} rowValues={mappedRowValues}/>
    )
};

export default EmployeeTable;