const date = new Date();
const dateToday = String(date.getDate()).padStart(2, "0") + "." + String(date.getMonth() + 1).padStart(2, "0") + "." + date.getFullYear(); //speichert den heutigen Tag im Format XX.XX.XXXX in dateToday
const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
const weekdays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
const numberOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const numberOfWeekdays = ["erste", "zweite", "dritte", "vierte", "fünfte"];

//setzt das heutige Datum in Überschrift h1 und in den Seitentitel
let headline = document.getElementById("main-headline");
let title = document.getElementById("title");
headline.textContent = "Kalenderblatt vom " + dateToday;
title.textContent = "Kalenderblatt vom " + dateToday;

//bezieht den Introtext auf das heutige Datum
let intro = document.getElementById("intro");
intro.textContent = "Der " + String(date.getDate()).padStart(2, "0") + ". " + months[date.getMonth()] + " " + date.getFullYear() + " ist ein " + weekdays[date.getDay()] + " und zwar der " + 
getNumberOfWeekdays() + " " + weekdays[date.getDay()] + " im Monat " + months[date.getMonth()] + " des Jahres " + date.getFullYear() + ". Es handelt sich um den " + 
dayOfTheYear() + ". Tag des Jahres, was bedeutet, dass es noch " + daysRemaining() + " Tage bis zum Jahresende sind. Der Monat " + months[date.getMonth()] + " hat insgesamt " + numberOfDays[date.getMonth()] + 
" Tage. Heute ist " + isHoliday() + " gesetzlicher Feiertag in Deutschland."

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
    if ((date.getDate() == 1 && date.getMonth() + 1 == 1) || (date.getDate() == 3 && date.getMonth() + 1 == 4) || (date.getDate() == 6 && date.getMonth() + 1 == 4) || 
    (date.getDate() == 1 && date.getMonth() + 1 == 5) || (date.getDate() == 14 && date.getMonth() + 1 == 5) || (date.getDate() == 25 && date.getMonth() + 1 == 5) || 
    (date.getDate() == 3 && date.getMonth() + 1 == 10) || (date.getDate() == 25 && date.getMonth() + 1 == 12) || (date.getDate() == 26 && date.getMonth() + 1 == 12)) {
        isHoliday = "ein";
    } else isHoliday = "kein";
    return isHoliday;
}

//rechnet aus der wievielte Wochentag heute diesen Monat ist
function getNumberOfWeekdays() {
    if (date.getDate() % 7 == 0) {
        return numberOfWeekdays[Math.floor((date.getDate() / 7)) - 1];
    } else return numberOfWeekdays[Math.floor((date.getDate() / 7))];
}

//____________________________@REVIEWER: Hier kannst du erstmal aufhören zu lesen_____________________________________________________________________________________________

//rechnet aus, welcher Tag dieses Jahr der Doomsday ist (funktioniert nur für die Jahre 2000-2099)
function getDoomsday() {
    let quotient = Math.floor(date.getFullYear() - 2000) / 12;
    let rest = (date.getFullYear() - 2000) % 12;
    let restDiv4 = Math.floor(rest / 4);
    let sum = quotient + rest + restDiv4;
    let addCenturyAnchor = sum + 2; //für 2000er Jahre
    let doomsdayNo = Math.floor(addCenturyAnchor % 7);
    return doomsdayNo; //weekdays[doomsdayNo] um den Wochentag zu bekommen
}

//rechnet aus, auf welchen Wochentag der 1. dieses Monats fällt
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

    return firstWeekdayNo; //weekdays[firstWeekdayNo] um den Wochentag des 1. des Monats zu bekommen
}