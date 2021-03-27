import React from "react";
import { makeStyles } from "@material-ui/styles";
import { ChipProperties } from './../interfaces';
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";

const breakpoints = createBreakpoints({});

const useStyles = makeStyles({
    root: {
        justifySelf: "center",
        height: "45px",
        borderRadius: "30px",
        width: "150px",
        [breakpoints.down("sm")]: {
            width: "100px"
        }
    },
    label: {
        lineHeight: "45px",
        fontSize: "1.15em"
    }
}, { classNamePrefix: "chip"});

export const Chip = ({ label, color }: ChipProperties): JSX.Element => {

    const classes = useStyles();

    return (
        <div className={classes.root} style={{ backgroundColor: color }}>
            <p className={classes.label}>{label}</p>
        </div>
    )
};

export default Chip;