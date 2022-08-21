const birthday = new Date("1986-10-11");
const jobStartDate = new Date("2003-09-01");


class Year {

    static getElapsedYears(startDate) {
        let currentYear = new Date().getFullYear();
        let startYear = startDate.getFullYear();
        let diff = currentYear - startYear;
        return diff;
    }

    static putYears(startDate, queryString) {
        let years = Year.getElapsedYears(startDate);
        if (queryString.startsWith("#")) {
            Year.updateSingleHTMLElement(queryString, years);
        } else if (queryString.startsWith(".")) {
            Year.updateMultipleHTMLElement(queryString, years);
        } else {
            throw new Error("Invalid query string: " + queryString);
        }
    }

    static updateSingleHTMLElement(queryString, years) {
        document.querySelector(queryString).innerText = years;
    }

    static updateMultipleHTMLElement(queryString, years) {
        document.querySelectorAll(queryString).forEach((element) => {
            element.innerText = years;
        })
    }
}
