import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  public static getAddedDaysDate(date: string, days: number): string {
    let d = new Date(date);
    d.setDate(d.getDate() + days);
    let month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = '' + d.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    return [year, month, day].join('-');
  }

  public static dateDifference(date1: string, date2: string, interval: string) {
    let second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24, week = day * 7;
    let dateObj1: any = new Date(date1);
    let dateObj2: any = new Date(date2);
    let timediff = dateObj2 - dateObj1;
    if (isNaN(timediff)) return NaN;
    switch (interval) {
      case "years": return dateObj2.getFullYear() - dateObj1.getFullYear();
      case "months": return (
        (dateObj2.getFullYear() * 12 + dateObj2.getMonth())
        -
        (dateObj1.getFullYear() * 12 + dateObj1.getMonth())
      );
      case "weeks": return Math.floor(timediff / week);
      case "days": return Math.floor(timediff / day);
      case "hours": return Math.floor(timediff / hour);
      case "minutes": return Math.floor(timediff / minute);
      case "seconds": return Math.floor(timediff / second);
      default: return undefined;
    }
  }
}
