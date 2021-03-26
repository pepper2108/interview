import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { CheckboxGroupProperties, CheckboxProperties } from "../interfaces";

const useStyles = makeStyles({
    root: {
        display: "flex",
        justifyContent: "center"
    }
}, { classNamePrefix: "checkbox-group"});

export const CheckboxGroup = ({ groupLabel, checkboxes, changeHandler }: CheckboxGroupProperties): JSX.Element => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <FormControl component="fieldset">
                <FormLabel component="legend" className="Mui-focused">{groupLabel}</FormLabel>
                <FormGroup>
                    {
                        checkboxes.map((checkbox: CheckboxProperties, index: number) => 
                            <FormControlLabel
                                control={<Checkbox checked={checkbox.checked} onChange={changeHandler} name={checkbox.label} />}
                                label={checkbox.label}
                                key={index}
                            />
                        )
                    }
                </FormGroup>
            </FormControl>
        </div>
    )
};

export default CheckboxGroup;