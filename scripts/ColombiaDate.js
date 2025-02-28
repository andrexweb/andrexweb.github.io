/**
 * 
 */
export class ColombiaDate {

    constructor(date) {
        this.date = date;
    }

    setHolidayName = function (name) {
        this.holidayName = name
    }

    getHolidayName = function () {
        return this.holidayName
    }

    isSunday = function () {
        return this.date.getDay() == 0
    }

    isHoliday = function () {
        const listHolidays = holidayMap['' + this.date.getFullYear()] || []
        for (let q = 0; q < listHolidays.length; q++) {
            const holiday = listHolidays[q].getHoliday()
            if (holiday.getMonth() == this.date.getMonth() && holiday.getDate() == this.date.getDate()) {
                this.date.setHolidayName(holiday.getHolidayName())
                return true
            }
        }
        return false
    }
}