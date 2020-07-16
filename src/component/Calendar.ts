function isLeapYear(year: number) {
    if (( year % 4 === 0 && (year % 100 !== 0) || year % 400 === 0 )) return true
    else return false
}

function findDay(century: number, year: number, month, day: number) {
    enum _MONTH {march = 1, april, may, june, july, august, september, october, november, december, january, february}

    let _month = parseInt(_MONTH[month])
    if (_month > 10) year -= 1

    return weekDay(day, month, year, century)
}

function weekDay(day, month, year, century) {
    let week_of_day = (Math.floor((13 * month -1) / 5) + 
                        Math.floor(year/4) + 
                        Math.floor(century/4) + 
                        day + year - 
                        (2 * century)) % 7

    if (week_of_day < 0) week_of_day += 7
    return week_of_day
}

function printCalendar(dow: number, month) {
    console.log('sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat')
    console.log(dow)
    let weeks = []
    let sun = [], mon = [], tue = [], wed = [], thu = [], fri = [], sat = []
    weeks = [sun, mon, tue, wed, thu, fri, sat]
    let arr: Array<number> = []
    // isLeapYear일 때 28일에 1일 추가
    const days = [31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 31, 28]
    const dows = [0, 1, 2, 3, 4, 5, 6]
    let item = [].concat(dows.slice(dow), dows.slice(0, dow))
    console.log('item', item)
    for (let i = 1; i <= days[month - 1]; i++) {
        arr[i - 1] = i
    }
    console.log(arr)

    for (let i = 0; i < arr.length; i++) {
        weeks[item[i % 7]].push(arr[i])
    }
    console.log(weeks)
    return arr
}

printCalendar(findDay(20, 20, 5, 1), 5)

