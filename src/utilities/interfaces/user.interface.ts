import { ELoginStatus } from '@utilities/enums/user.enum';

export interface IUser {
  nextDiggingTime: Date,
  totalCoins: number
}

export interface IFriend {
  id: string,
  name: string,
  status: ELoginStatus
}
