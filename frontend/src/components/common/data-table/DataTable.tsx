import React from "react";
import { CheckboxGroupProperties, DataTableRowValue } from "../interfaces";
import DataTableHeader from "./data-table-header/DataTableHeader";
import DataTableRow from "./data-table-row/DataTableRow";

export interface DataTableProps {
    columnsNames: string[];
    rowValues: DataTableRowValue[][];
    filters: CheckboxGroupProperties;
}

export const DataTable = ({ columnsNames, rowValues, filters }: DataTableProps): JSX.Element => {

    return (
        <>
            <DataTableHeader columns={columnsNames} filters={filters}/>
            <div>
                {
                    rowValues.map((value: DataTableRowValue[], index: number) => 
                        <DataTableRow key={index} rowValues={value}/>
                    )
                }             
            </div>
        </>
    )
};

export default DataTable;