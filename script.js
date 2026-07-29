const date = new Date();
const dateToday = String(date.getDate()).padStart(2, "0") + "." + String(date.getMonth() + 1).padStart(2, "0") + "." + date.getFullYear(); //speichert den heutigen Tag im Format XX.XX.XXXX in dateToday

let headline = document.getElementById("main-headline");
let title = document.getElementById("title");
headline.textContent = "Kalenderblatt vom " + dateToday;
title.textContent = "Kalenderblatt vom " + dateToday;

const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
const weekdays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
const numberOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const numberOfWeekdays = ["erste", "zweite", "dritte", "vierte", "fünfte"];

//rechnet aus der wievielte Tag des Jahres heute ist
function dayOfTheYear() {
    let days = date.getDate();
    for (let i = 0; i < date.getMonth(); i++) {
        days += numberOfDays[i];
    }
    return days;
}

//rechnet aus wieviele Tage dieses Jahr noch hat
function daysRemaining() {
    let remaining;
    if ((date.getFullYear() % 4 == 0 && date.getFullYear() % 100 != 0) || date.getFullYear() % 400 == 0) {
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

//macht den Introtext dynamisch, immer auf den heutigen Tag bezogen
let intro = document.getElementById("intro");
intro.textContent = "Der " + String(date.getDate()).padStart(2, "0") + ". " + months[date.getMonth()] + " " + date.getFullYear() + " ist ein " + weekdays[date.getDay()] + " und zwar der " + 
getNumberOfWeekdays() + " " + weekdays[date.getDay()] + " im Monat " + months[date.getMonth()] + " des Jahres " + date.getFullYear() + ". Es handelt sich um den " + 
dayOfTheYear() + ". Tag des Jahres, was bedeutet, dass es noch " + daysRemaining() + " Tage bis zum Jahresende sind. Der Monat " + months[date.getMonth()] + " hat insgesamt " + numberOfDays[date.getMonth()] + 
" Tage. Heute ist " + isHoliday() + " gesetzlicher Feiertag in Deutschland."