import { map, scan, switchMap, take, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { TimeHelperService } from '@utilities/helpers/time-helper.service';
import { UserService } from '@services/user.service';
import { ELoginStatus } from '@utilities/enums/user.enum';

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
    tap(user => this.nextDiggingTime = new Date(user.nextDiggingTime))
  )
  public piCoin$ = this.$user.user$.pipe(map(user => user.totalCoins));

  public onDig() {
    this.diggingTimer = setInterval(() => {
      this.$user.friends$.pipe(
        take(1),
        map(friends => 1 + friends.filter(friend => friend.status === ELoginStatus.Digging).length * 0.25),
        switchMap(coins => this.$user.updateCoinsNumber$(coins))
      ).subscribe();
    }, 1000);
  }

  public endDig() {
    clearInterval(this.diggingTimer);
    this.nextDiggingTime = this.$time.getDateByToday({ hours: 24 });
    this.$user.updateNextDiggingTime$(this.nextDiggingTime).subscribe();
    this.isDigging = false
  }
}
