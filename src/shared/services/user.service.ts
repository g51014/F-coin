import { map, take, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ELoginStatus } from '@utilities/enums/user.enum';
import { IFriend, IUser } from '@utilities/interfaces/user.interface';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
    this.initial();
  }

  public friends = new ReplaySubject<IFriend[]>();
  public friends$ = this.friends.asObservable().pipe(
    tap(friends => localStorage.setItem('friends', JSON.stringify(friends)))
  );

  private user = new ReplaySubject<IUser>();
  public user$ = this.user.asObservable().pipe(
    tap(user => localStorage.setItem('user', JSON.stringify(user)))
  );

  private initial() {
    this.friends.next(JSON.parse(localStorage.getItem('friends')) || this.setFriendsSocketMockData())
    this.user.next(JSON.parse(localStorage.getItem('user')) || this.setUserMockData());
  }

  // send coins number updated post request here
  public updateCoinsNumber$ = (totalCoins: number) => this.user$.pipe(
    take(1),
    map(user => {
      this.user.next({ ...user, ...{ totalCoins } });
      return totalCoins;
    })
  );

  // send update nextDiggingTime request here
  public updateNextDiggingTime$ = (nextDiggingTime: Date) => this.user$.pipe(
    take(1),
    tap(user => this.user.next({ ...user, ...{ nextDiggingTime } }))
  )


  // come from api
  private setUserMockData(): IUser {
    return {
      nextDiggingTime: new Date(),
      totalCoins: 0,
    }
  }

  // come from socket
  private setFriendsSocketMockData(): IFriend[] {
    const Random = Math.floor(Math.random() * Math.floor(10)) || 1;
    const List: IFriend[] = [];
    for (let id = 0; id < Random; id = id + 1) {
      List.push({ id: `${id}`, name: `mock_friend_${id}`, status: ELoginStatus.Offline });
    }
    return List;
  }
}
