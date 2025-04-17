
/**
 * ColombiaDay.js
 * 
 * Ley 28 de 1925
 * 
 * @class ColombiaDay
 * @description Clase para calcular los días festivos en Colombia
 */
export class ColombiaDay {

    constructor(name, options) {

        if (options.sundayNumber) {
            this._date = this.getSunday(options.year, options.month - 1, options.sundayNumber);
            this._day = this._date.getDate()
            this._month = this._date.getMonth()
            this._year = this._date.getFullYear()
        } else if (options.addEaster) {
            this._date = this.easterAdd(options.easterDay, options.addEaster);
            this._day = this._date.getDate()
            this._month = this._date.getMonth()
            this._year = this._date.getFullYear()
        } else {
            this._year = options.year;
            this._month = options.month;
            this._day = options.day;
            this._date = new Date(options.year, options.month - 1, options.day, 0, 0, 0, 1);
        }
        this._unset = true
        this.holiday = true
        this.holidayName = name
    }

    getHoliday() {
        return this._date;
    }

    getHolidayName() {
        return this.holidayName;
    }

    easterAdd(easterDay, days) {
        const calendar = new Date(easterDay);
        calendar.setDate(easterDay.getDate() + days);
        return calendar;
    }

    /** funcion que basado en año y mes, calcule un n-esimo domingo */
    getSunday(year, month, n) {
        const date = new Date(year, month, 1);
        let count = 0;
        while (date.getMonth() == month) {
            if (date.getDay() == 0) {
                count++;
                if (count == n) {
                    return date;
                }
            }
            date.setDate(date.getDate() + 1);
        }
        return null;
    }

}