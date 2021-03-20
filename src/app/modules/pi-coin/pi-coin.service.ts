import { map, scan, switchMap, take, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { TimeHelperService } from '@utilities/helpers/time-helper.service';
import { UserService } from '@services/user.service';

@Injectable({
  providedIn: 'root'
})
export class PiCoinService {

  constructor(
    private $time: TimeHelperService,
    private $user: UserService
  ) {
    this.initial$.subscribe();
  }

  public nextDiggingTime: Date;
  public isDigging: boolean;

  private diggingTimer;
  private initial$ = this.$user.user$.pipe(
    take(1),
    tap(user => {
      this.nextDiggingTime = new Date(user.nextDiggingTime);
      this.piCoin.next(user.totalCoins);
    })
  )

  private piCoin = new ReplaySubject<number>();
  public piCoin$ = this.piCoin.asObservable().pipe(
    scan((previous, current) => previous + current),
    switchMap(totalCoins => this.$user.updateCoinsNumber$(totalCoins))
  );

  public onDig() {
    this.diggingTimer = setInterval(() => this.piCoin.next(1), 1000);
  }

  public endDig() {
    clearInterval(this.diggingTimer);
    this.nextDiggingTime = this.$time.getDateByToday({ hours: 24 });
    this.$user.updateNextDiggingTime$(this.nextDiggingTime).subscribe();
    this.isDigging = false
  }
}
