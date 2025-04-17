import { ColombiaDay } from "./ColombiaDay.js";
import { ColombiaHoliday } from "./ColombiaHoliday.js"
import { anonymousGregorianAlgorithm } from "./GregorianAlgorithm.js"
/**
 * 
 */

const holidayMap = {}

export class ColombiaDate {

    static Calendar = { JANUARY: 1, MARCH: 3, MAY: 5, JUNE: 6, JULY: 7, AUGUST: 8, OCTOBER: 10, NOVEMBER: 11, DECEMBER: 12 }

    /**
     * 
     * @param {number} year 
     * @param {number} month 
     */
    constructor(year, month, day) {
        this._year = year;
        this._month = month;
        this._day = day;
        this._date = new Date(year, month, day, 0, 0, 0, 1);
        this._generateHolidays(this._year)
        this._unset = false
        this.holiday = false
        this.specialDay = false
        this.holidayName = ''
        this._calculateHoliday()
    }

    setHolidayName = function (name) {
        this.holidayName = name
    }

    getHolidayName = function () {
        return this.holidayName
    }

    isSunday = function () {
        return this._date.getDay() == 0
    }

    isSaturday = function () {
        return this._date.getDay() == 6
    }

    _calculateHoliday = function () {
        const listHolidays = holidayMap['' + this._date.getFullYear()] || []
        for (let q = 0; q < listHolidays.length; q++) {


            const holiday = listHolidays[q].getHoliday()
            if (holiday.getMonth() == this._date.getMonth() && holiday.getDate() == this._date.getDate()) {
                this.holidayName +=  (this.holidayName.length == 0 ? '':',') + listHolidays[q].getHolidayName()
                if(listHolidays[q] instanceof ColombiaDay) {
                    this.specialDay = true
                }
                if(listHolidays[q] instanceof ColombiaHoliday) {
                    this.holiday = true
                }
                
                console.log('Holiday: ', this.holidayName, 'isHoliday: ', this.holiday, 'isSpecialDay: ', this.specialDay)
            }
        }
        this._unset = true
    }

    isHoliday = function () {
        if (this._unset) {
            return this.holiday
        }
        this._calculateHoliday()
        return this.holiday
    }

    isSpecialDay = function () {
        if (this._unset) {
            return this.specialDay
        }
        this._calculateHoliday()
        return this.specialDay
    }

    getDay() {
        return this._date.getDay()
    }

    setDate(number) {
        this._date.setDate(number)
        this._day = this._date.getDate()
        this._month = this._date.getMonth()
        this._year = this._date.getFullYear()
        this._generateHolidays(this._year)
        this._unset = false
        this.holiday = false
        this.specialDay = false
        this.holidayName = ''
        this._calculateHoliday()
    }

    getDate() {
        return this._date.getDate()
    }

    getMonth() {
        return this._date.getMonth()
    }

    getFullYear() {
        return this._date.getFullYear()
    }

    _generateHolidays(year) {

        if (holidayMap['' + year]) {
            return holidayMap['' + year]
        }

        const easterDay = anonymousGregorianAlgorithm(year)
        let holidays = []

        const specialDays = {
            holidays: [
                {name: "holiday_new_year", month: 1, day: 1, emilini: false},
                {name: "holiday_three_kings", month: 1, day: 6, emilini: true},
                {name: "holiday_saint_joseph", month: 3, day: 19, emilini: true},
                {name: "holiday_holy_thursday", addEaster: -3, day: 3, emilini: false},
                {name: "holiday_holy_friday", addEaster: -2, day: 2, emilini: false},
                {name: "holiday_labor", month: 5, day: 1, emilini: false},
                {name: "holiday_ascension_of_jesus", addEaster: 39, emilini: true},
                {name: "holiday_corpus_christi", addEaster: 60, emilini: true},
                {name: "holiday_sacred_heart_of_jesus", addEaster: 68, emilini: true},
                {name: "holiday_saint_peter_and_paul", month: 6, day: 29, emilini: true},
                {name: "holiday_cry_of_independence", month: 7, day: 20, emilini: false},
                {name: "holiday_boyaca_batttle", month: 8, day: 7, emilini: false},
                {name: "holiday_assumption_of_the_virgin", month: 8, day: 15, emilini: true},
                {name: "holiday_day_of_race", month: 10, day: 12, emilini: true},
                {name: "holiday_all_saints", month: 11, day: 1, emilini: true},
                {name: "holiday_independence_of_cartagena", month: 11, day: 11, emilini: true},
                {name: "holiday_immaculate_conception", month: 12, day: 8, emilini: false},
                {name: "holiday_christmas", month: 12, day: 25, emilini: false}
            ],
            recognitiondays:[
                {name: "language_day", month: 4, day:23},
                {name: "mother_day", month: 5, sundayNumber: 2},
                {name: "father_day", month: 6, sundayNumber: 3},
                {name: "ash_wednesday", addEaster: -46},
                {name: "day_of_the_candles", month: 12, day: 7},
                {name: "day_of_the_candles", month: 12, day: 8},
                {name: "holy_innocentes_day", month: 12, day: 28},
            ]
        }

        specialDays.holidays.forEach(holiday => {
            if (holiday.addEaster) {
                holidays.push(new ColombiaHoliday(holiday.name, { easterDay, addEaster: holiday.addEaster, emilini: holiday.emilini }))
            } else {
                holidays.push(new ColombiaHoliday(holiday.name, { year, month: holiday.month, day: holiday.day, emilini: holiday.emilini }))
            }
        })

        specialDays.recognitiondays.forEach(holiday => {
            if (holiday.sundayNumber) {
                holidays.push(new ColombiaDay(holiday.name, { year, month: holiday.month, sundayNumber: holiday.sundayNumber }))
            } else if(holiday.addEaster) {
                holidays.push(new ColombiaDay(holiday.name, { easterDay, addEaster: holiday.addEaster}))
            } else {
                holidays.push(new ColombiaDay(holiday.name, { year, month: holiday.month, day: holiday.day}))
            }
        })

        /*
        holidays.push(new ColombiaHoliday("holiday_new_year", { year, 'month': ColombiaDate.Calendar.JANUARY, 'day': 1, 'emilini': false }))
        holidays.push(new ColombiaHoliday("holiday_three_kings", { year, 'month': ColombiaDate.Calendar.JANUARY, 'day': 6, 'emilini': true }))
        holidays.push(new ColombiaHoliday("holiday_saint_joseph", { year, 'month': ColombiaDate.Calendar.MARCH, 'day': 19, 'emilini': true }))
        holidays.push(new ColombiaHoliday("holiday_holy_thursday", { easterDay, 'addEaster': -3, 'emilini': false }))
        holidays.push(new ColombiaHoliday("holiday_holy_friday", { easterDay, 'addEaster': -2, 'emilini': false }))
        holidays.push(new ColombiaHoliday("holiday_labor", { year, 'month': ColombiaDate.Calendar.MAY, 'day': 1, 'emilini': false }))
        holidays.push(new ColombiaHoliday("holiday_ascension_of_jesus", { easterDay, 'addEaster': 39, 'emilini': true }))
        holidays.push(new ColombiaHoliday("holiday_corpus_christi", { easterDay, 'addEaster': 60, 'emilini': true }))
        holidays.push(new ColombiaHoliday("holiday_sacred_heart_of_jesus", { easterDay, 'addEaster': 68, 'emilini': true }))
        holidays.push(new ColombiaHoliday("holiday_saint_peter_and_paul", { year, 'month': ColombiaDate.Calendar.JUNE, 'day': 29, 'emilini': true }))
        holidays.push(new ColombiaHoliday("holiday_cry_of_independence", { year, 'month': ColombiaDate.Calendar.JULY, 'day': 20, 'emilini': false }))
        holidays.push(new ColombiaHoliday("holiday_boyaca_batttle", { year, 'month': ColombiaDate.Calendar.AUGUST, 'day': 7, 'emilini': false }))
        holidays.push(new ColombiaHoliday("holiday_assumption_of_the_virgin", { year, 'month': ColombiaDate.Calendar.AUGUST, 'day': 15, 'emilini': true }))
        holidays.push(new ColombiaHoliday("holiday_day_of_race", { year, 'month': ColombiaDate.Calendar.OCTOBER, 'day': 12, 'emilini': true }))
        holidays.push(new ColombiaHoliday("holiday_all_saints", { year, 'month': ColombiaDate.Calendar.NOVEMBER, 'day': 1, 'emilini': true }))
        holidays.push(new ColombiaHoliday("holiday_independence_of_cartagena", { year, 'month': ColombiaDate.Calendar.NOVEMBER, 'day': 11, 'emilini': true }))
        holidays.push(new ColombiaHoliday("holiday_immaculate_conception", { year, 'month': ColombiaDate.Calendar.DECEMBER, 'day': 8, 'emilini': false }))
        holidays.push(new ColombiaHoliday("holiday_christmas", { year, 'month': ColombiaDate.Calendar.DECEMBER, 'day': 25, 'emilini': false }))
        */

        holidayMap[`${year}`] = holidays

        return holidayMap['' + year];
    }
}
