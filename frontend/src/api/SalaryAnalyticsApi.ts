import employeeDataset from "../stubs/EmployeeDataset.json";

export const getEmployeeSalaryData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(employeeDataset);
        }, 2000)
    }
)};