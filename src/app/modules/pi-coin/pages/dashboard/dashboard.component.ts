import { IFriend } from '@utilities/interfaces/user.interface';
import { Component, HostListener, OnInit } from '@angular/core';
import { UnsubOndestroy } from '@utilities/abstract/unsub-ondestroy';
import { TimeHelperService } from '@utilities/helpers/time-helper.service';
import { first, takeUntil, tap } from 'rxjs/operators';
import { PiCoinService } from '../../pi-coin.service';
import { UserService } from '@services/user.service';
import { ELoginStatus } from '@utilities/enums/user.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends UnsubOndestroy implements OnInit {

  constructor(
    public $piCoin: PiCoinService,
    public $user: UserService,
    private $time: TimeHelperService
  ) {
    super();
  }

  ngOnInit(): void {
    this.$piCoin.piCoin$.pipe(
      takeUntil(this.onDestroy$),
      tap(coin => this.piCoins = coin)
    ).subscribe();
  }

  public piCoins = 0;
  get allowDigging() { return !this.$time.isAfterToday(this.$piCoin.nextDiggingTime); }

  @HostListener('click') dip() {
    if (!this.$piCoin.isDigging && this.allowDigging) {
      this.$piCoin.onDig();
      this.$piCoin.isDigging = true;
    }
  }

  public getDiggingFriendsNumber(friends: IFriend[]): number {
    return friends.filter(friend => friend.status === ELoginStatus.Digging).length;
  }

  public stop(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.$piCoin.endDig();
  }

  public onDestory() {
    this.stop();
  }


}
