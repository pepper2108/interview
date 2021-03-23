import React from "react";
import DataTableHeader from "./data-table-header/DataTableHeader";
import DataTableRow from "./data-table-row/DataTableRow";

export interface DataTableProps {
    columnsNames: string[];
    rowValues: string[][];
}

export const DataTable = ({ columnsNames, rowValues }: DataTableProps): JSX.Element => {

    return (
        <>
            <DataTableHeader columns={columnsNames}/>
            {
                rowValues.map((value: string[], index: number) => 
                    <DataTableRow key={index} rowValues={value}/>
                )
            }
        </>
    )
};

export default DataTable;