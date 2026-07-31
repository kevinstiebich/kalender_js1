const date = new Date();
const dateToday = String(date.getDate()).padStart(2, "0") + "." + String(date.getMonth() + 1).padStart(2, "0") + "." + date.getFullYear(); //speichert den heutigen Tag im Format XX.XX.XXXX in dateToday
const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
const numberOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const numberOfWeekdays = ["erste", "zweite", "dritte", "vierte", "fünfte"];
const options = {weekday: "long"};

//setzt das heutige Datum in Überschrift h1 und in den Seitentitel
let headline = document.getElementById("main-headline");
let title = document.getElementById("title");
headline.textContent = "Kalenderblatt vom " + dateToday;
title.textContent = "Kalenderblatt vom " + dateToday

//ändert den Text mittels Tags im HTML Text
let dayToday = document.getElementById("dayToday");
dayToday.textContent = String(date.getDate()).padStart(2, "0");
let monthString1 = document.getElementById("monthString1");
monthString1.textContent = months[date.getMonth()];
let monthString2 = document.getElementById("monthString2");
monthString2.textContent = months[date.getMonth()];
let monthString3 = document.getElementById("monthString3");
monthString3.textContent = months[date.getMonth()];
let thisYear1 = document.getElementById("year1");
thisYear1.textContent = date.getFullYear();
let thisYear2 = document.getElementById("year2");
thisYear2.textContent = date.getFullYear();
let weekdayToday1 = document.getElementById("weekdayToday1");
weekdayToday1.textContent = date.toLocaleDateString("de-DE", options);
let weekdayToday2 = document.getElementById("weekdayToday2");
weekdayToday2.textContent = date.toLocaleDateString("de-DE", options);
let weekdayCount = document.getElementById("weekdayCount");
weekdayCount.textContent = getNumberOfWeekdays();
let xDayOfTheYear = document.getElementById("xDayOfTheYear");
xDayOfTheYear.textContent = dayOfTheYear();
let xDaysRemaining = document.getElementById("xDaysRemaining");
xDaysRemaining.textContent = daysRemaining();
let daysThisMonth = document.getElementById("daysThisMonth");
daysThisMonth.textContent = numberOfDays[date.getMonth()];
let holidayToday = document.getElementById("holidayToday");
holidayToday.textContent = isHoliday();

//passt den Kalender auf den aktuellen Monat an (startet und endet am korrekten Wochentag)
for (let i = 0; i < numberOfDays[date.getMonth()]; i++) {
    let changeDay = document.getElementById("calendar" + (i + getFirstWeekday()));
    changeDay.textContent = i + 1;
}

//rechnet aus der wievielte Tag des Jahres heute ist
function dayOfTheYear() {
    let days = date.getDate();
    for (let i = 0; i < date.getMonth(); i++) {
        days += numberOfDays[i];
    }
    return days;
}

//prüft ob ein Jahr ein Schaltjahr ist
function isLeapYear() {
    if ((date.getFullYear() % 4 == 0 && date.getFullYear() % 100 != 0) || date.getFullYear() % 400 == 0) {
        return true;
    } else return false;
}

//rechnet aus wieviele Tage dieses Jahr noch hat
function daysRemaining() {
    let remaining;
    if (isLeapYear()) {
        remaining = 366;
    } else remaining = 365;
    return remaining -= dayOfTheYear();
}

//prüft ob heute ein gesetzlicher Feiertag ist
function isHoliday() {
    let isHoliday;
    let easter = calcEaster();
    let goodFriday = calcHolidays(-2);
    let easterMonday = calcHolidays(1);
    let ascensionOfChrist = calcHolidays(40);
    let whitMonday = calcHolidays(51);
    let corpusChristi = calcHolidays(60);
    let day = date.getDate();
    let month = date.getMonth() + 1;

    let holidays = [[1, 1], [easter[1], easter[0]], [goodFriday[1], goodFriday[0]], [easterMonday[1], easterMonday[0]], [ascensionOfChrist[1], ascensionOfChrist[0]], 
    [whitMonday[1], whitMonday[0]], [corpusChristi[1], corpusChristi[0]], [3, 10], [25, 12], [26, 12]];

    for (let i = 0; i < holidays.length; i++) {
        if (day == holidays[i][0] && month == holidays[i][1]) {
            return isHoliday = "ein";
        }
    }

    return isHoliday = "kein";
}

//rechnet aus der wievielte Wochentag heute diesen Monat ist
function getNumberOfWeekdays() {
    if (date.getDate() % 7 == 0) {
        return numberOfWeekdays[Math.floor((date.getDate() / 7)) - 1];
    } else return numberOfWeekdays[Math.floor((date.getDate() / 7))];
}

function calcEaster() {
    let year = date.getFullYear();
    let a = year % 19;
    let b = Math.floor(year / 100);
    let c = year % 100;
    let d = Math.floor(b / 4);
    let e = b % 4;
    let f = Math.floor((b + 8) / 25);
    let g = Math.floor((b - f + 1) / 3);
    let h = (19 * a + b - d - g + 15) % 30;
    let i = Math.floor(c / 4);
    let k = c % 4;
    let l = (32 + 2 * e + 2 * i - h - k) % 7;
    let m = Math.floor((a + 11 * h + 22 * l) / 451);

    let month = Math.floor((h + l - 7 * m + 114) / 31);
    let day = ((h + l - 7 * m + 114) % 31) + 1;

    let easterMonthDay = [month, day];
    return easterMonthDay;
}

function calcHolidays(addend) {
    let holiday = calcEaster();
    holiday[1] += addend;
    console.log("davor: " + holiday);
    if (addend > 0) {
        while (holiday[1] > numberOfDays[holiday[0]]) {
            holiday[1] -= numberOfDays[holiday[0]];
            holiday[0]++;
            console.log("im while: " + holiday);
        }
    } else {
        while (holiday[1] < 1) {
            holiday[1] += numberOfDays[holiday[0] - 1];
            holiday[0]--;
        }
    }
    console.log("danach: " + holiday);
    return holiday;
}

//rechnet aus, welcher Tag dieses Jahr der Doomsday ist (funktioniert nur für die Jahre 2000-2099)
function getDoomsday() {
    let quotient = Math.floor(date.getFullYear() - 2000) / 12;
    let rest = (date.getFullYear() - 2000) % 12;
    let restDiv4 = Math.floor(rest / 4);
    let sum = quotient + rest + restDiv4;
    let addCenturyAnchor = sum + 2; //für 2000er Jahre
    let doomsdayNo = Math.floor(addCenturyAnchor % 7);
    return doomsdayNo;
}

//rechnet aus, auf welchen Wochentag der 1. dieses Monats fällt - mit date.getDay() ändern!!
function getFirstWeekday() {
    let firstWeekdayNo;
    let doomsday = getDoomsday();
    let moduloThisMonth;

    switch (date.getMonth()) {
        case 0:
            if (isLeapYear()) {
                moduloThisMonth = (4 - 1) % 7
            } else moduloThisMonth = (3 - 1) % 7;

            if (doomsday >= moduloThisMonth) {
                firstWeekdayNo = doomsday - moduloThisMonth;
            } else {
                firstWeekdayNo = doomsday + 7 - moduloThisMonth;
            }
            break;
        case 1:
            if (isLeapYear()) {
                moduloThisMonth = (29 - 1) % 7
            } else moduloThisMonth = (28 - 1) % 7;

            if (doomsday >= moduloThisMonth) {
                firstWeekdayNo = doomsday - moduloThisMonth;
            } else {
                firstWeekdayNo = doomsday + 7 - moduloThisMonth;
            }
            break;
        case 2:
            moduloThisMonth = (14 - 1) % 7;
            if (doomsday >= moduloThisMonth) {
                firstWeekdayNo = doomsday - moduloThisMonth;
            } else {
                firstWeekdayNo = doomsday + 7 - moduloThisMonth;
            }
            break;
        case 3:
            moduloThisMonth = (4 - 1) % 7;
            if (doomsday >= moduloThisMonth) {
                firstWeekdayNo = doomsday - moduloThisMonth;
            } else {
                firstWeekdayNo = doomsday + 7 - moduloThisMonth;
            }
            break;
        case 4:
            moduloThisMonth = (9 - 1) % 7;
            if (doomsday >= moduloThisMonth) {
                firstWeekdayNo = doomsday - moduloThisMonth;
            } else {
                firstWeekdayNo = doomsday + 7 - moduloThisMonth;
            }
            break;
        case 5:
            moduloThisMonth = (6 - 1) % 7;
            if (doomsday >= moduloThisMonth) {
                firstWeekdayNo = doomsday - moduloThisMonth;
            } else {
                firstWeekdayNo = doomsday + 7 - moduloThisMonth;
            }
            break;
        case 6:
            moduloThisMonth = (11 - 1) % 7;
            if (doomsday >= moduloThisMonth) {
                firstWeekdayNo = doomsday - moduloThisMonth;
            } else {
                firstWeekdayNo = doomsday + 7 - moduloThisMonth;
            }
            break;
        case 7:
            moduloThisMonth = (8 - 1) % 7;
            if (doomsday >= moduloThisMonth) {
                firstWeekdayNo = doomsday - moduloThisMonth;
            } else {
                firstWeekdayNo = doomsday + 7 - moduloThisMonth;
            }
            break;
        case 8:
            moduloThisMonth = (5 - 1) % 7;
            if (doomsday >= moduloThisMonth) {
                firstWeekdayNo = doomsday - moduloThisMonth;
            } else {
                firstWeekdayNo = doomsday + 7 - moduloThisMonth;
            }
            break;
        case 9:
            moduloThisMonth = (10 - 1) % 7;
            if (doomsday >= moduloThisMonth) {
                firstWeekdayNo = doomsday - moduloThisMonth;
            } else {
                firstWeekdayNo = doomsday + 7 - moduloThisMonth;
            }
            break;
        case 10:
            moduloThisMonth = (7 - 1) % 7;
            if (doomsday >= moduloThisMonth) {
                firstWeekdayNo = doomsday - moduloThisMonth;
            } else {
                firstWeekdayNo = doomsday + 7 - moduloThisMonth;
            }
            break;
        case 11:
            moduloThisMonth = (12 - 1) % 7;
            if (doomsday >= moduloThisMonth) {
                firstWeekdayNo = doomsday - moduloThisMonth;
            } else {
                firstWeekdayNo = doomsday + 7 - moduloThisMonth;
            }
            break;
        }

    return firstWeekdayNo;
}