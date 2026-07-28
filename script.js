const date = new Date("2026-07-27");
const dateToday = String(date.getDate()).padStart(2, "0") + "." + String(date.getMonth() + 1).padStart(2, "0") + "." + date.getFullYear();


let headline = document.getElementById("main-headline");
let title = document.getElementById("title");
headline.textContent = "Kalenderblatt vom " + dateToday;
title.textContent = "Kalenderblatt vom " + dateToday;

const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
const weekdays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
const numberOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const numberOfWeekdays = ["erste", "zweite", "dritte", "vierte", "fünfte"];

function DayOfTheYear() {
    let days = date.getDate();
    for (let i = 0; i < date.getMonth(); i++) {
        days += numberOfDays[i];
    }
    return days;
}

function DaysRemaining() {
    let remaining;
    if ((date.getFullYear() % 4 == 0 && date.getFullYear() % 100 != 0) || date.getFullYear() % 400 == 0) {
        remaining = 366;
    } else remaining = 365;
    remaining -= DayOfTheYear();
    return remaining;
}

function isHoliday() {
    let isHoliday;
    if ((date.getDate() == 1 && date.getMonth() + 1 == 1) || (date.getDate() == 3 && date.getMonth() + 1 == 4) || (date.getDate() == 6 && date.getMonth() + 1 == 4) || (date.getDate() == 1 && date.getMonth() + 1 == 5) || (date.getDate() == 14 && date.getMonth() + 1 == 5) || (date.getDate() == 25 && date.getMonth() + 1 == 5) || (date.getDate() == 3 && date.getMonth() + 1 == 10) || (date.getDate() == 25 && date.getMonth() + 1 == 12) || (date.getDate() == 26 && date.getMonth() + 1 == 12)) {
        isHoliday = "ein";
    } else isHoliday = "kein";
    return isHoliday;
}


let intro = document.getElementById("intro");
intro.textContent = "Der " + String(date.getDate()).padStart(2, "0") + ". " + months[date.getMonth()] + " " + date.getFullYear() + " ist ein " + weekdays[date.getDay()] + " und zwar der " + numberOfWeekdays[Math.floor((date.getDate() / 7)) - 1] + " " + weekdays[date.getDay()] + " im Monat " + months[date.getMonth()] + " des Jahres " + date.getFullYear() + ". Es handelt sich um den " + DayOfTheYear() + ". Tag des Jahres, was bedeutet, dass es noch " + DaysRemaining() + " Tage bis zum Jahresende sind. Der Monat " + months[date.getMonth()] + " hat insgesamt " + numberOfDays[date.getMonth()] + " Tage. Heute ist " + isHoliday() + " gesetzlicher Feiertag in Deutschland."