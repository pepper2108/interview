import { makeStyles } from "@material-ui/styles";
import React from "react";

export interface DataTableHeaderProps {
    columns: string[];
}

const useStyles = makeStyles({
    root: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
        textAlign: "center",
        width: "100%",
        height: "70px",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#04a599",
        color: "#fafafa",
    },
    label: { 
        fontSize: "1.2em",
        letterSpacing: "0.03em"
    }
}, { classNamePrefix: "data-table-header"});

export const DataTableHeader = ({ columns }: DataTableHeaderProps): JSX.Element => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {
                columns.map((column: string, index: number) => 
                    <p key={index} className={classes.label}>{column}</p>
                )
            }
        </div>
    )
};

export default DataTableHeader;