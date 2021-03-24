import React from "react";
import { makeStyles } from "@material-ui/styles";
import { ChipProperties } from './../interfaces';

const useStyles = makeStyles({
    root: {
        justifySelf: "center",
        height: "45px",
        borderRadius: "30px",
    },
    label: {
        lineHeight: "45px",
        fontSize: "1.15em"
    }
}, { classNamePrefix: "chip"});

export const Chip = ({ label, color, size }: ChipProperties): JSX.Element => {

    const classes = useStyles();

    const sizesMap = {
        small: "100px",
        medium: "150px",
        large: "200px"
    }

    return (
        <div className={classes.root} style={{ backgroundColor: color, width: sizesMap[size] }}>
            <p className={classes.label}>{label}</p>
        </div>
    )
};

export default Chip;