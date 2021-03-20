import { PiCoinService } from './../../../pi-coin/pi-coin.service';
import { IFriend } from '@utilities/interfaces/user.interface';
import { AbstractModal } from '@utilities/abstract/modal';
import { Component, OnInit } from '@angular/core';
import { UserService } from '@services/user.service';
import { takeUntil, map, take, tap, switchMap } from 'rxjs/operators';
import { interval, timer } from 'rxjs';
import { ELoginStatus } from '@utilities/enums/user.enum';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent extends AbstractModal implements OnInit {

  constructor(
    public $user: UserService,
    public $pinCoin: PiCoinService
  ) {
    super();
  }

  get onlineFriends(): IFriend[] { return this.friends.filter(friend => friend.status === ELoginStatus.Online); }

  public friends: IFriend[] = [];
  private socket$ = interval(1000).pipe(
    tap(() => this.randomChangeFirendStatue())
  );

  ngOnInit(): void {
    this.$user.friends$.pipe(
      takeUntil(this.onDestroy$),
      tap(friends => this.friends = [...[], ...friends])
    ).subscribe();

    this.socket$.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe();
  }

  private randomChangeFirendStatue() {
    let result = [...[], ...this.friends];
    const Random = Math.floor(Math.random() * Math.floor(result.length - 1));
    const Status = Math.floor(Math.random() * Math.floor(4));
    result[Random].status = Status < 1 ? 1 : Status > 3 ? 3 : Status;
    this.$user.friends.next(result);
  }
}
