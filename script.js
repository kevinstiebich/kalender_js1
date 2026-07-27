const date = new Date();
const dateToday = String(date.getDate()).padStart(2, "0") + "." + String(date.getMonth() + 1).padStart(2, "0") + "." + date.getFullYear();


let headline = document.getElementById("main-headline");
let title = document.getElementById("title");
headline.textContent = "Kalenderblatt vom " + dateToday;
title.textContent = "Kalenderblatt vom " + dateToday;

const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
const weekdays = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
const numberOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

let intro = document.getElementById("intro");
intro.textContent = "Der " + String(date.getDate()).padStart(2, "0") + ". " + months[date.getMonth()] + " " + date.getFullYear() + " ist ein " + weekdays[date.getDay()] + " und zwar der " + zweite + weekdays[date.getDay()] + " im Monat " + months[date.getMonth()] + " des Jahres " + date.getFullYear() + ". Es handelt sich um den " + 194. + " Tag des Jahres, was bedeutet, dass es noch " + 171 + " Tage bis zum Jahresende sind. Der Monat " + months[date.getMonth()] + " hat insgesamt " + numberOfDays[date.getMonth()] + " Tage. Heute ist " + kein + "gesetzlicher Feiertag in Deutschland."