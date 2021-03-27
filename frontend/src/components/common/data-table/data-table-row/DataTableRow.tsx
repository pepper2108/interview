import { makeStyles } from "@material-ui/styles";
import React from "react";
import Chip from "../../chip/Chip";
import { DataTableRowValue } from "../../interfaces";
import { ChipProperties } from './../../interfaces';

export interface DataTableRowProps {
    rowValues: DataTableRowValue[];
    highlightTotalColumn?: boolean;
}

const useStyles = makeStyles({
    root: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
        textAlign: "center",
        width: "100%",
        height: "100px",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#fafafa",
        color: "#2d333b",
        border: "1px solid #e1e4e8"
    },
    label: { 
        fontSize: "1.15em",
        letterSpacing: "0.03em"
    },
    total: {
        "&:last-child > p:first-child": {
            fontWeight: 600
        }
    }
}, { classNamePrefix: "data-table-row" });

export const DataTableRow = ({ rowValues, highlightTotalColumn = true }: DataTableRowProps): JSX.Element => {
    const classes = useStyles();
    
    const isChipValue = (value: DataTableRowValue): value is ChipProperties => {
        return (value as ChipProperties).color !== undefined;
    }

    return (
        <div className={`${classes.root} ${highlightTotalColumn ? classes.total : ""}`}>
            {
                rowValues.map((column: DataTableRowValue, index: number) => 
                    {
                        return isChipValue(column) ? 
                            <Chip key={index} label={column.label} color={column.color}/> :
                            <p key={index} className={classes.label}>{column}</p>
                    }
                )
            }
        </div> 
    )
};

export default DataTableRow;