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

    useEffect((): void => {

        enum DeltaChipsColors {
            "positive" = "#adff2e",
            "negative" = "#ffa500",
            "zero" = "#ffff00"
        };

        const getChipColor = (delta: number): DeltaChipsColors => {
            if (delta > 0) {
                return DeltaChipsColors.positive;
            } else if (delta < 0) {
                return DeltaChipsColors.negative;
            } else {
                return DeltaChipsColors.zero;
            }
        }

        const getAdaptedDataTableValues = (rowValues: SalaryComparisonData[]): DataTableRowValue[][] => rowValues.map((salaryData: SalaryComparisonData) => {
            return [
                salaryData.location,
                `${salaryData.salary.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 2 })}`,
                { label: `${salaryData.delta >= 0 ? "+" : ""}${salaryData.delta}%`, color: `${getChipColor(salaryData.delta)}` }
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