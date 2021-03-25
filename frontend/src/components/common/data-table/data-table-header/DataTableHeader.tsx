import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import FilterListIcon from '@material-ui/icons/FilterList';
import { CheckboxGroupProperties } from "../../interfaces";
import { Button, Popover } from "@material-ui/core";
import CheckboxGroup from "../../checkbox-group/CheckboxGroup";

export interface DataTableHeaderProps {
    columns: string[];
    filters: CheckboxGroupProperties;
}

const useStyles = makeStyles({
    root: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
        position: "relative",
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
    },
    filterButton: {
        position: "absolute",
        right: "50px"
    },
    popoverContent: {
        padding: "10px"
    }
}, { classNamePrefix: "data-table-header" });

export const DataTableHeader = ({ columns, filters }: DataTableHeaderProps): JSX.Element => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = (): void => {
        setAnchorEl(null);
    };

    const isPopoverOpened = Boolean(anchorEl);
    const id = isPopoverOpened ? 'simple-popover' : undefined;

    return (
        <div className={classes.root}>
            {
                columns.map((column: string, index: number) =>
                    <p key={index} className={classes.label}>{column}</p>
                )
            }

            <Button
                variant="contained"
                color="primary"
                className={classes.filterButton}
                startIcon={<FilterListIcon />}
                onClick={handleFilterClick}
            >Filter
            </Button>

            <Popover
                id={id}
                open={isPopoverOpened}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}>
                <div className={classes.popoverContent}>
                    <CheckboxGroup groupLabel={filters.groupLabel}
                        checkboxes={filters.checkboxes}
                        changeHandler={filters.changeHandler}
                    />
                </div>
            </Popover>

        </div>
    )
};

export default DataTableHeader;