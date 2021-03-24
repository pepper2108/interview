export interface EmployeeData {
    currSalary: string;
    firstName: string;
    lastName: string;
    location: string;
    org: string;
    prevSalary: string;
}

export type EmployeeDataByCountry = Record<string, EmployeeData[]>;

export interface SalaryComparisonData {
    location: string;
    salary: number;
    delta: number;
}