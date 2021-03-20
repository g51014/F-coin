import { Component, HostListener, OnInit } from '@angular/core';
import { UnsubOndestroy } from '@utilities/abstract/unsub-ondestroy';
import { TimeHelperService } from '@utilities/helpers/time-helper.service';
import { PiCoinService } from '../../pi-coin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends UnsubOndestroy implements OnInit {

  constructor(
    public $piCoin: PiCoinService,
    private $time: TimeHelperService
  ) {
    super();
  }

  ngOnInit(): void {
  }

  public isDigging = false;

  get allowDigging() { return !this.$time.isAfterToday(this.$piCoin.nextDiggingTime); }

  @HostListener('click') dip() {
    if (!this.isDigging && this.allowDigging) {
      this.$piCoin.onDig();
      this.isDigging = true;
    }
  }

  public stop(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.$piCoin.endDig();
    this.isDigging = false
  }

  public onDestory() {
    this.stop();
  }


}
