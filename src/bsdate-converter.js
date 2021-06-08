import { adDaysFull, bsMonths, bsMonthsEnglish } from './variables'
import { getDates } from './dates'

export class BikramSambatConverter {
  constructor() {
    this.bs = getDates()
    this.nepaliMonthEnglish = bsMonthsEnglish
    this.nepaliMonths = bsMonths
    this.engWeekDays = adDaysFull
    this.nepDate = {}
    this.debugInfo = ''
  }

  isLeapYear = function (year) {
    var a = year
    if (a % 100 === 0) {
      if (a % 400 === 0) {
        return true
      } else {
        return false
      }
    } else {
      if (a % 4 === 0) {
        return true
      } else {
        return false
      }
    }
  }

  getNepaliMonth = function (m) {
    return this.nepaliMonths[m - 1]
  }

  getEngDayOfTheWeek = function (day) {
    return this.engWeekDays[day - 1]
  }

  isRangeEng = function (yy, mm, dd) {
    if (yy < 1944 || yy > 2033) {
      this.debugInfo = 'Supported only between 1944-2033'
      return false
    }

    if (mm < 1 || mm > 12) {
      this.debugInfo = 'Error! value 1-12 only'
      return false
    }

    if (dd < 1 || dd > 31) {
      this.debugInfo = 'Error! value 1-31 only'
      return false
    }

    return true
  }

  engToNepali = function (yy, mm, dd) {
    yy = parseInt(yy)
    mm = parseInt(mm)
    dd = parseInt(dd)
    if (this.isRangeEng(yy, mm, dd) === false) {
      return false
    } else {
      // english month data.
      var month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      var lmonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      // spear head english date...
      const defEyy = 1944
      const defNyy = 2000
      const defNum = 9
      // spear head nepali date...
      const defNdd = 17 - 1
      let totalEdays = 0
      let totalNdays = 0
      let a = 0
      // all the initializations...
      let day = 7 - 1
      var m = 0
      var y = 0
      var i = 0
      var j = 0

      let numDay = 0

      // count total no. of days in-terms of year
      for (i = 0; i < yy - defEyy; i++) {
        // total days for month calculation...(english)
        if (this.isLeapYear(defEyy + i))
          for (j = 0; j < 12; j++) totalEdays += lmonth[j]
        else for (j = 0; j < 12; j++) totalEdays += month[j]
      }

      // count total no. of days in-terms of month
      for (i = 0; i < mm - 1; i++) {
        if (this.isLeapYear(yy)) totalEdays += lmonth[i]
        else totalEdays += month[i]
      }

      // count total no. of days in-terms of date
      totalEdays += dd

      i = 0
      j = defNum
      totalNdays = defNdd
      m = defNum
      y = defNyy

      // count nepali date from array
      while (totalEdays !== 0) {
        a = this.bs[i][j]
        // count the days
        totalNdays++
        // count the days interms of 7 days
        day++
        if (totalNdays > a) {
          m++
          totalNdays = 1
          j++
        }
        if (day > 7) day = 1
        if (m > 12) {
          y++
          m = 1
        }
        if (j > 12) {
          j = 1
          i++
        }
        totalEdays--
      }

      numDay = day
      this.nepDate = {}

      this.nepDate.year = y //
      this.nepDate.month = this.getNepaliMonth(m)
      this.nepDate.date = totalNdays //
      this.nepDate.day = this.getEngDayOfTheWeek(day)
      this.nepDate.nmonth = m
      this.nepDate.num_day = numDay
      return this.nepDate
    }
  }
}
