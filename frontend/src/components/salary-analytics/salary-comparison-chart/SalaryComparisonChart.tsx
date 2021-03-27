import { makeStyles } from "@material-ui/styles";
import React from "react";
import { CheckboxGroupProperties } from "../../common/interfaces";
import { SalaryComparisonData } from "../interfaces";
import { ResponsiveBar } from "@nivo/bar";
import DataTableHeader from "../../common/data-table/data-table-header/DataTableHeader";
import { isMobile } from "react-device-detect";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";

export interface SalaryComparisonChartProps {
    columnsNames: string[];
    rowValues: Pick<SalaryComparisonData, "location" | "salary">[];
    filters: CheckboxGroupProperties;
}

const breakpoints = createBreakpoints({});

const useStyles = makeStyles({
    root: {
        height: "900px",
        paddingBottom: "50px",
        overflow: "hidden",
        [breakpoints.down("xs")]: {
            height: "700px"
        }
    },
    tooltip: {
        whiteSpace: "break-spaces",
        [breakpoints.down("xs")]: {
            maxWidth: "80px"
        }
    }
}, { classNamePrefix: "salary-chart" });

const theme = {
    fontSize: "18px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    axis: {
        lineHeight: '17px',
        textColor: '#2d333b',
        ticks: {
            line: {
                stroke: "#FFF"
            },
            text: {
                fill: "#2d333b",
            }
        },
        legend: {
            text: {
                fontSize: 17
            }
        }
    },
    grid: {
        line: {
            stroke: '#F3F5F8',
            strokeWidth: 1
        }
    }
};

export const SalaryComparisonChart = ({ columnsNames, rowValues, filters }: SalaryComparisonChartProps): JSX.Element => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <DataTableHeader columns={columnsNames} filters={filters}/>
            <ResponsiveBar
                data={rowValues}
                keys={["salary"]}
                indexBy="location"
                theme={theme as any} // TS definition is incomplete for theme
                margin={{ top: 50, right: isMobile ? 20 : 50, bottom: 100, left: isMobile ? 60 : 90 }}
                padding={0.3}
                colors={{ scheme: 'dark2' }}
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 0,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Location',
                    legendPosition: 'middle',
                    legendOffset: 50,
                    format: (value) => {
                        if (isMobile) {
                            return value === "Total" ? "All" : (value as string).substring(0, 2);
                        }

                        return value as string;
                    }
                }}
                enableLabel={!isMobile}
                axisLeft={{
                    tickSize: 3,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Salary, $',
                    legendPosition: 'middle',
                    legendOffset: isMobile ? -50 : -70,
                    format: (value) => isMobile ? `${(value as number) / 1000}k` : value as number
                }}
                animate={false}
                labelFormat={(label) => label.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 2 })}
                tooltip={slice => {
                    const isTooltipOfTotalColumn = slice.indexValue === "Total";
                    const tooltipText = `Average salary ${isTooltipOfTotalColumn ? "across the countries" : "in "}`;
                    return (
                        <p className={classes.tooltip}>
                            {tooltipText}{!isTooltipOfTotalColumn ? <strong>{slice.indexValue}</strong> : ""}: {slice.value.toLocaleString(
                                undefined, { style: "currency", currency: "USD", maximumFractionDigits: 2 })} 
                        </p>
                    )
                }}
            />
        </div>
    )
};

export default SalaryComparisonChart;