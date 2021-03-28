import { getAveragesByCountry, getDataForTotalColumn, groupEmployeesByCountry, filterSelectedCountries } from './helpers';

describe("helper functions", () => {
    const mockedEmployeesList = [
        {
            "firstName": "Nancee",
            "lastName": "Ramsdell",
            "location": "China",
            "prevSalary": "$11010.09",
            "currSalary": "$6366.62",
            "org": "IT Support"
        },
        {
            "firstName": "Jane",
            "lastName": "Doe",
            "location": "China",
            "prevSalary": "$11010.09",
            "currSalary": "$6366.62",
            "org": "IT Support"
        },
        {
            "firstName": "John",
            "lastName": "Doe",
            "location": "Japan",
            "prevSalary": "$9010.09",
            "currSalary": "$10366.62",
            "org": "IT Support"
        },
        {
            "firstName": "Wendall",
            "lastName": "Broadbear",
            "location": "Philippines",
            "prevSalary": "$10159.20",
            "currSalary": "$5117.81",
            "org": "HR"
        }
    ];

    describe("groupEmployeesByCountry", () => {

        const expectedOutput = {
            China: [{
                "firstName": "Nancee",
                "lastName": "Ramsdell",
                "location": "China",
                "prevSalary": "$11010.09",
                "currSalary": "$6366.62",
                "org": "IT Support"
            },
            {
                "firstName": "Jane",
                "lastName": "Doe",
                "location": "China",
                "prevSalary": "$11010.09",
                "currSalary": "$6366.62",
                "org": "IT Support"
            }],
            Japan: [{
                "firstName": "John",
                "lastName": "Doe",
                "location": "Japan",
                "prevSalary": "$9010.09",
                "currSalary": "$10366.62",
                "org": "IT Support"
            }],
            Philippines: [{
                "firstName": "Wendall",
                "lastName": "Broadbear",
                "location": "Philippines",
                "prevSalary": "$10159.20",
                "currSalary": "$5117.81",
                "org": "HR"
            }]
        };
    
        it("should properly map employees by country", () => {
            expect(groupEmployeesByCountry(mockedEmployeesList, "location")).toEqual(expectedOutput);
        });
    
    });

    describe("getAveragesForCountry", () => {
        const expectedOutput = [
            {
                "salary": 6366.62,
                "delta": 72.93,
                "location": "China"
            },
            {
                "salary": 10366.62,
                "delta": -13.09,
                "location": "Japan"
            },
            {
                "salary": 5117.81,
                "delta": 98.51,
                "location": "Philippines"
            }
        ];

        it("should properly calculate average values by countries and map them to an array", () => {
            const groupedData = groupEmployeesByCountry(mockedEmployeesList, "location");

            expect(getAveragesByCountry(groupedData)).toEqual(expectedOutput);
        });
    });
    
    describe("getDataForTotalColumn", () => {
        const expectedTotal = 7283.68; // limiting the number of digits to 2 to avoid fraction issues

        it("should properly calculate average value by the pointer", () => {
            const groupedData = groupEmployeesByCountry(mockedEmployeesList, "location");
            const averageData = getAveragesByCountry(groupedData);

            expect(parseFloat(getDataForTotalColumn(averageData, "salary").toFixed(2))).toEqual(expectedTotal);
        });

    });

    describe("filterSelectedCountries", () => {
        const selectedCountries = ["Philippines", "Japan"];
        const expectedOutput = {
            Japan: [{
                "firstName": "John",
                "lastName": "Doe",
                "location": "Japan",
                "prevSalary": "$9010.09",
                "currSalary": "$10366.62",
                "org": "IT Support"
            }],
            Philippines: [{
                "firstName": "Wendall",
                "lastName": "Broadbear",
                "location": "Philippines",
                "prevSalary": "$10159.20",
                "currSalary": "$5117.81",
                "org": "HR"
            }]
        };

        it("should properly exclude non-selected countries", () => {
            const groupedData = groupEmployeesByCountry(mockedEmployeesList, "location");
            expect(filterSelectedCountries(groupedData, selectedCountries)).toEqual(expectedOutput);
        });

    });
})