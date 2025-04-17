/**
 * ColombiaHoliday.js
 * 
 * Ley Memiliani o Ley 51 de 1983
 * 
 * @class ColombiaHoliday
 * @description Class to calculate holidays in Colombia
 */
export class ColombiaHoliday {
    constructor(name, options) {

        this.holidayName = name;

        if (options.easterDay) {
            this.isLeyEmiliani = options.easterDay.getFullYear() > 1983 ? options.emilini : false;

            if (!this.isLeyEmiliani) {
                this.day = this.easterAdd(options.easterDay, options.addEaster);
            } else if (this.leyEmiliani) {
                this.day = this.easterWithLeyEmiliani(options.easterDay, options.addEaster);
            }
        } else {
            this.isLeyEmiliani = options.year > 1983 ? options.emilini : false;

            if (!this.isLeyEmiliani) {
                this.day = new Date(options.year, options.month - 1, options.day);
            } else if (this.leyEmiliani) {
                this.day = this.leyEmilianiDate(options.year, options.month - 1, options.day);
            }
        }
    }

    getHoliday() {
        return this.day;
    }

    getHolidayName() {
        return this.holidayName;
    }

    easterAdd(easterDay, days) {
        const calendar = new Date(easterDay);
        calendar.setDate(easterDay.getDate() + days);
        return calendar;
    }

    /**
     * Ley Memiliani o Ley 51 de 1983
     *
     * @param {number} year
     * @param {number} month
     * @param {number} day
     * @returns {Date}
     */
    leyEmilianiDate(year, month, day) {
        const calendar = new Date(year, month, day);
        this.leyEmiliani(calendar);
        return calendar;
    }

    easterWithLeyEmiliani(computus, days) {
        const calendar = new Date(computus);
        calendar.setDate(computus.getDate() + days);
        this.leyEmiliani(calendar);
        return calendar;
    }

    leyEmiliani(calendar) {
        const diaSemana = calendar.getDay();
        if (diaSemana !== 1) {
            const dias = (6 - diaSemana + 2) % 7;
            calendar.setDate(calendar.getDate() + dias);
        }
    }
}
