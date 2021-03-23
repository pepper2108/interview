import { makeStyles } from "@material-ui/styles";
import React from "react";

export interface DataTableRowProps {
    rowValues: string[];
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
        fontSize: "1.2em",
        letterSpacing: "0.03em"
    }
}, { classNamePrefix: "data-table-row"});

export const DataTableRow = ({ rowValues }: DataTableRowProps): JSX.Element => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {
                rowValues.map((column: string, index: number) => 
                    <p key={index} className={classes.label}>{column}</p>
                )
            }
        </div>
    )
};

export default DataTableRow;