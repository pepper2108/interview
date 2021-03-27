import { EmployeeData, EmployeeDataByCountry, SalaryComparisonData } from "./interfaces";

export const groupEmployeesByCountry = (array: any[], key: string): { [key: string]: EmployeeData[]} => {
    return array.reduce((result: any, currentValue: any) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);

      return result;
    }, {});
};

export const getDataForTotalColumn = (array: any[], pointer: string): number => {
    return array
        .map(value => value[pointer])
        .reduce((accumulator, currentValue) => accumulator + currentValue) / array.length;
};

export const filterSelectedCountries = (rawData: EmployeeDataByCountry, filters: any[]): { [key: string]: EmployeeData[] } => {
    return Object.fromEntries(Object.entries(rawData)
        .filter(([key]) => filters.includes(key)));
};

export const getAveragesByCountry = (shownData: EmployeeDataByCountry): SalaryComparisonData[] => {
    let averageData: SalaryComparisonData[] = [];

    const calculateAverageValues = (aggregatedEmployeeData: SalaryComparisonData, employeesAmount: number): SalaryComparisonData => {
        return {
            salary: aggregatedEmployeeData.salary / employeesAmount,
            delta: parseFloat((aggregatedEmployeeData.delta / employeesAmount).toFixed(2)),
            location: aggregatedEmployeeData.location
        };
    };

    Object.entries(shownData).forEach(([country, employeeData]: [string, EmployeeData[]]) => {
        const aggregatedEmployeeData = employeeData.reduce((result: SalaryComparisonData, currentValue: EmployeeData) => {
            const parsedCurrentSalary = parseFloat(currentValue.currSalary.substring(1));
            const parsedPreviousSalary = parseFloat(currentValue.prevSalary.substring(1));
            result.salary += parsedCurrentSalary;
            result.delta += ((parsedPreviousSalary / parsedCurrentSalary) * 100) - 100;

            return result;
        }, { location: country, salary: 0, delta: 0 } as SalaryComparisonData);
        const averageDataByCountry = calculateAverageValues(aggregatedEmployeeData, employeeData.length);

        averageData.push(averageDataByCountry);
    });

    return averageData;
}