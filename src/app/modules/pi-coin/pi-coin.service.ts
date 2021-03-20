import { scan } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { TimeHelperService } from '@utilities/helpers/time-helper.service';

@Injectable({
  providedIn: 'root'
})
export class PiCoinService {

  constructor(
    private $time: TimeHelperService
  ) { }

  private diggingTimer;
  public nextDiggingTime: Date;

  private piCoin = new ReplaySubject<number>();
  public piCoin$ = this.piCoin.asObservable().pipe(
    scan((previous, current) => previous + current),
  );

  public onDig() {
    this.diggingTimer = setInterval(() => this.piCoin.next(1), 1000);
  }

  public endDig() {
    clearInterval(this.diggingTimer);
    this.nextDiggingTime = this.$time.getDateByToday({ hours: 24 });
  }
}
