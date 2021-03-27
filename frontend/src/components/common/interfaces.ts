import { ChangeEvent } from "react";

export interface ChipProperties {
    label: string;
    color: string;
}

export type DataTableRowValue = string | ChipProperties;

export interface CheckboxProperties {
    checked: boolean;
    label: string;
}

export interface CheckboxGroupProperties {
    groupLabel: string;
    checkboxes: CheckboxProperties[];
    changeHandler?: (event: ChangeEvent<HTMLInputElement>) => void;
}