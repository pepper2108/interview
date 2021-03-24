import React, { useEffect, useState } from "react";
import DataTable from "../../common/data-table/DataTable";
import { CheckboxGroupProperties, DataTableRowValue } from "../../common/interfaces";
import { SalaryComparisonData } from "../interfaces";

export interface SalaryComparisonTableProps {
    columnsNames: string[];
    rowValues: SalaryComparisonData[];
    filters: CheckboxGroupProperties;
}

export const SalaryComparisonTable = ({ columnsNames, rowValues, filters }: SalaryComparisonTableProps): JSX.Element => {
    const [mappedRowValues, setMappedRowValues] = useState<DataTableRowValue[][]>([]);

    useEffect(() => {
        const deltaChipsColors = {
            positive: "#adff2e",
            negative: "#ffa500",
            zero: "#ffff00"
        };

        const getChipColor = (delta: number) => {
            if (delta > 0) {
                return deltaChipsColors.positive;
            } else if (delta < 0) {
                return deltaChipsColors.negative;
            } else {
                return deltaChipsColors.zero;
            }
        }

        const getAdaptedDataTableValues = (rowValues: SalaryComparisonData[]): DataTableRowValue[][] => rowValues.map((salaryData: SalaryComparisonData) => {
            return [
                salaryData.location,
                `${salaryData.salary.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 })}`,
                { label: `${salaryData.delta >= 0 ? "+" : ""}${salaryData.delta}%`, color: `${getChipColor(salaryData.delta)}`, size: "medium" }
            ]
        });

        const adaptedDataTableValues = getAdaptedDataTableValues(rowValues);
        setMappedRowValues(adaptedDataTableValues);
    }, [rowValues]);

    return (
        <DataTable columnsNames={columnsNames} rowValues={mappedRowValues} filters={filters}/>
    )
};

export default SalaryComparisonTable;