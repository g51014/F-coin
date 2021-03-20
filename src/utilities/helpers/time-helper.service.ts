import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TimeHelperService {

  constructor() { }

  get today() {
    return moment(new Date());
  }

  public getDateByToday({ months = 0, days = 0, hours = 0 }: { months?: number, days?: number, hours?: number }): Date {
    const date = moment(new Date()).add(months, 'months').add(days, 'days').add(hours, 'hours');
    return new Date(date.year(), date.month(), date.date(), date.hours(), date.minutes());
  }

  public isAfterToday(date: Date) {
    return moment(date).isAfter(moment(new Date()));
  }



}
